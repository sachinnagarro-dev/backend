import { Document } from 'mongoose';
export type ConversationEventDocument = ConversationEvent & Document;
export declare class ConversationEvent {
    eventId: string;
    sessionId: string;
    type: string;
    payload: Record<string, any>;
    timestamp: Date;
}
export declare const ConversationEventSchema: import("mongoose").Schema<ConversationEvent, import("mongoose").Model<ConversationEvent, any, any, any, any, any, ConversationEvent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversationEvent, Document<unknown, {}, ConversationEvent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ConversationEvent & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    eventId?: import("mongoose").SchemaDefinitionProperty<string, ConversationEvent, Document<unknown, {}, ConversationEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sessionId?: import("mongoose").SchemaDefinitionProperty<string, ConversationEvent, Document<unknown, {}, ConversationEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, ConversationEvent, Document<unknown, {}, ConversationEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    payload?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, ConversationEvent, Document<unknown, {}, ConversationEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    timestamp?: import("mongoose").SchemaDefinitionProperty<Date, ConversationEvent, Document<unknown, {}, ConversationEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ConversationEvent & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ConversationEvent>;
