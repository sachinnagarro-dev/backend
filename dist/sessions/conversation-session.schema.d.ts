import { Document } from 'mongoose';
export type ConversationSessionDocument = ConversationSession & Document;
export declare class ConversationSession {
    sessionId: string;
    status: string;
    language: string;
    startedAt: Date;
    endedAt?: Date;
    metadata?: Record<string, any>;
}
export declare const ConversationSessionSchema: import("mongoose").Schema<ConversationSession, import("mongoose").Model<ConversationSession, any, any, any, any, any, ConversationSession>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversationSession, Document<unknown, {}, ConversationSession, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    sessionId?: import("mongoose").SchemaDefinitionProperty<string, ConversationSession, Document<unknown, {}, ConversationSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ConversationSession, Document<unknown, {}, ConversationSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    language?: import("mongoose").SchemaDefinitionProperty<string, ConversationSession, Document<unknown, {}, ConversationSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startedAt?: import("mongoose").SchemaDefinitionProperty<Date, ConversationSession, Document<unknown, {}, ConversationSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, ConversationSession, Document<unknown, {}, ConversationSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    metadata?: import("mongoose").SchemaDefinitionProperty<Record<string, any> | undefined, ConversationSession, Document<unknown, {}, ConversationSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ConversationSession>;
