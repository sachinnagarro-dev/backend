# Design Decisions

## 1. How did you ensure idempotency?

For creating or upserting sessions (POST /sessions), I used MongoDB's `findOneAndUpdate` with `upsert: true`. This ensures that if the sessionId already exists, it returns the existing session without creating a duplicate. The operation is atomic and safe under concurrent requests.

For adding events (POST /sessions/:sessionId/events), I check if the session exists first, then attempt to save the event. Since there's a unique compound index on (sessionId, eventId), duplicate inserts will fail with a duplicate key error, which I catch and return a conflict error. This prevents duplicate events.

For completing sessions (POST /sessions/:sessionId/complete), I used `findOneAndUpdate` which is idempotent as setting status to 'completed' and endedAt multiple times won't change the outcome.

## 2. How does your design behave under concurrent requests?

The use of MongoDB's atomic operations like `findOneAndUpdate` and unique indexes ensures consistency. For session creation, concurrent upserts will result in one session being created or the existing one returned. For events, the unique index prevents duplicates. The database handles locking at the document level.

## 3. What MongoDB indexes did you choose and why?

- For ConversationSession: Index on `sessionId` (already unique via schema).
- For ConversationEvent: 
  - Compound unique index on `sessionId` and `eventId` to ensure uniqueness per session.
  - Compound index on `sessionId` and `timestamp` for efficient querying of events ordered by timestamp for a session.

These indexes support the query patterns: finding sessions by ID, ensuring event uniqueness, and paginating events by session.

## 4. How would you scale this system for millions of sessions per day?

- **Database Sharding**: Shard by sessionId to distribute load across multiple MongoDB instances.
- **Read Replicas**: Use MongoDB replicas for read operations, especially for GET requests.
- **Caching**: Cache frequently accessed sessions/events in Redis.
- **Async Processing**: For high volume, consider queuing events with something like Kafka and processing asynchronously, but since the requirement says no background jobs, keep it synchronous.
- **API Gateway**: Use a gateway for rate limiting and load balancing.
- **Horizontal Scaling**: Run multiple instances of the NestJS app behind a load balancer.

## 5. What did you intentionally keep out of scope, and why?

- Authentication/Authorization: Not required per constraints.
- Advanced pagination (cursor-based): Simple offset-based is sufficient.
- Event validation beyond basic types: Payload is flexible object.
- Background jobs/queues: Explicitly not allowed.
- Comprehensive logging/monitoring: Focus on core functionality.
- Tests: Not mandatory, but basic structure is there.
- Error recovery/retry mechanisms: Keep simple.