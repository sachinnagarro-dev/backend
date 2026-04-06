import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationSession, ConversationSessionDocument } from './conversation-session.schema';
import { ConversationEvent, ConversationEventDocument } from './conversation-event.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/add-event.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(ConversationSession.name)
    private sessionModel: Model<ConversationSessionDocument>,
    @InjectModel(ConversationEvent.name)
    private eventModel: Model<ConversationEventDocument>,
  ) {}

  async createOrUpsertSession(dto: CreateSessionDto): Promise<ConversationSession> {
    const { sessionId, language, metadata } = dto;
    const now = new Date();

    // Use findOneAndUpdate with upsert for idempotency
    const session = await this.sessionModel.findOneAndUpdate(
      { sessionId },
      {
        $setOnInsert: {
          sessionId,
          language,
          metadata,
          startedAt: now,
          status: 'initiated',
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return session;
  }

  async addEvent(sessionId: string, dto: AddEventDto): Promise<ConversationEvent> {
    // Check if session exists
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const { eventId, type, payload, timestamp } = dto;

    // Try to insert, if duplicate, it will throw
    try {
      const event = new this.eventModel({
        eventId,
        sessionId,
        type,
        payload,
        timestamp: new Date(timestamp),
      });
      return await event.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        throw new ConflictException('Event already exists');
      }
      throw error;
    }
  }

  async getSessionWithEvents(sessionId: string, limit: number = 10, offset: number = 0): Promise<{ session: ConversationSession; events: ConversationEvent[] }> {
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const events = await this.eventModel
      .find({ sessionId })
      .sort({ timestamp: 1 })
      .limit(limit)
      .skip(offset);

    return { session, events };
  }

  async completeSession(sessionId: string): Promise<ConversationSession> {
    const session = await this.sessionModel.findOneAndUpdate(
      { sessionId },
      { status: 'completed', endedAt: new Date() },
      { new: true },
    );

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }
}
