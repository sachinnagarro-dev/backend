import { Controller, Post, Get, Body, Param, Query, HttpCode } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/add-event.dto';
import { GetSessionQueryDto } from './dto/get-session-query.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(200) // For upsert, return 200 if exists
  async createOrUpsertSession(@Body() dto: CreateSessionDto) {
    return this.sessionsService.createOrUpsertSession(dto);
  }

  @Post(':sessionId/events')
  async addEvent(@Param('sessionId') sessionId: string, @Body() dto: AddEventDto) {
    return this.sessionsService.addEvent(sessionId, dto);
  }

  @Get(':sessionId')
  async getSessionWithEvents(
    @Param('sessionId') sessionId: string,
    @Query() query: GetSessionQueryDto,
  ) {
    const { limit, offset } = query;
    return this.sessionsService.getSessionWithEvents(sessionId, limit, offset);
  }

  @Post(':sessionId/complete')
  @HttpCode(200)
  async completeSession(@Param('sessionId') sessionId: string) {
    return this.sessionsService.completeSession(sessionId);
  }
}
