import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationSessionDocument = ConversationSession & Document;

@Schema({ timestamps: true })
export class ConversationSession {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({ required: true, enum: ['initiated', 'active', 'completed', 'failed'], default: 'initiated' })
  status: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  endedAt?: Date;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const ConversationSessionSchema = SchemaFactory.createForClass(ConversationSession);

// Indexes
ConversationSessionSchema.index({ sessionId: 1 }); // Already unique, but explicit