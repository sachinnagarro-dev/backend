import { Model } from 'mongoose';
import { ConversationSession, ConversationSessionDocument } from './conversation-session.schema';
import { ConversationEvent, ConversationEventDocument } from './conversation-event.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/add-event.dto';
export declare class SessionsService {
    private sessionModel;
    private eventModel;
    constructor(sessionModel: Model<ConversationSessionDocument>, eventModel: Model<ConversationEventDocument>);
    createOrUpsertSession(dto: CreateSessionDto): Promise<ConversationSession>;
    addEvent(sessionId: string, dto: AddEventDto): Promise<ConversationEvent>;
    getSessionWithEvents(sessionId: string, limit?: number, offset?: number): Promise<{
        session: ConversationSession;
        events: ConversationEvent[];
    }>;
    completeSession(sessionId: string): Promise<ConversationSession>;
}
