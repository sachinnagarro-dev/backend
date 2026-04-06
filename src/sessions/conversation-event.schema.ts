import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationEventDocument = ConversationEvent & Document;

@Schema({ timestamps: true })
export class ConversationEvent {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true, enum: ['user_speech', 'bot_speech', 'system'] })
  type: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ required: true })
  timestamp: Date;
}

export const ConversationEventSchema = SchemaFactory.createForClass(ConversationEvent);

// Indexes
ConversationEventSchema.index({ sessionId: 1, eventId: 1 }, { unique: true }); // Unique per session
ConversationEventSchema.index({ sessionId: 1, timestamp: 1 }); // For querying events by session ordered by timestamp