"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conversation_session_schema_1 = require("./conversation-session.schema");
const conversation_event_schema_1 = require("./conversation-event.schema");
let SessionsService = class SessionsService {
    sessionModel;
    eventModel;
    constructor(sessionModel, eventModel) {
        this.sessionModel = sessionModel;
        this.eventModel = eventModel;
    }
    async createOrUpsertSession(dto) {
        const { sessionId, language, metadata } = dto;
        const now = new Date();
        const session = await this.sessionModel.findOneAndUpdate({ sessionId }, {
            $setOnInsert: {
                sessionId,
                language,
                metadata,
                startedAt: now,
                status: 'initiated',
            },
        }, { upsert: true, new: true, setDefaultsOnInsert: true });
        return session;
    }
    async addEvent(sessionId, dto) {
        const session = await this.sessionModel.findOne({ sessionId });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        const { eventId, type, payload, timestamp } = dto;
        try {
            const event = new this.eventModel({
                eventId,
                sessionId,
                type,
                payload,
                timestamp: new Date(timestamp),
            });
            return await event.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Event already exists');
            }
            throw error;
        }
    }
    async getSessionWithEvents(sessionId, limit = 10, offset = 0) {
        const session = await this.sessionModel.findOne({ sessionId });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        const events = await this.eventModel
            .find({ sessionId })
            .sort({ timestamp: 1 })
            .limit(limit)
            .skip(offset);
        return { session, events };
    }
    async completeSession(sessionId) {
        const session = await this.sessionModel.findOneAndUpdate({ sessionId }, { status: 'completed', endedAt: new Date() }, { new: true });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        return session;
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_session_schema_1.ConversationSession.name)),
    __param(1, (0, mongoose_1.InjectModel)(conversation_event_schema_1.ConversationEvent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map