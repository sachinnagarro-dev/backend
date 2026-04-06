import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/add-event.dto';
import { GetSessionQueryDto } from './dto/get-session-query.dto';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    createOrUpsertSession(dto: CreateSessionDto): Promise<import("./conversation-session.schema").ConversationSession>;
    addEvent(sessionId: string, dto: AddEventDto): Promise<import("./conversation-event.schema").ConversationEvent>;
    getSessionWithEvents(sessionId: string, query: GetSessionQueryDto): Promise<{
        session: import("./conversation-session.schema").ConversationSession;
        events: import("./conversation-event.schema").ConversationEvent[];
    }>;
    completeSession(sessionId: string): Promise<import("./conversation-session.schema").ConversationSession>;
}
