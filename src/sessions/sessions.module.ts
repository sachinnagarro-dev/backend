import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSession, ConversationSessionSchema } from './conversation-session.schema';
import { ConversationEvent, ConversationEventSchema } from './conversation-event.schema';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConversationSession.name, schema: ConversationSessionSchema },
      { name: ConversationEvent.name, schema: ConversationEventSchema },
    ]),
  ],
  providers: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
