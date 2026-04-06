# API Test Examples - Conversation Session Service

## 1. Create or Upsert Session

### Request
```bash
curl -X POST http://localhost:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-001",
    "language": "en",
    "metadata": {
      "userId": "user-123",
      "channel": "phone",
      "campaignId": "campaign-xyz"
    }
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "sessionId": "session-001",
  "status": "initiated",
  "language": "en",
  "startedAt": "2026-04-06T10:42:46.016Z",
  "metadata": {
    "userId": "user-123",
    "channel": "phone",
    "campaignId": "campaign-xyz"
  },
  "createdAt": "2026-04-06T10:42:46.018Z",
  "updatedAt": "2026-04-06T10:42:46.018Z"
}
```

### Upsert (same sessionId again) - Returns existing session
```bash
curl -X POST http://localhost:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-001",
    "language": "en",
    "metadata": {
      "userId": "user-123",
      "channel": "phone"
    }
  }'
```

---

## 2. Add Events to Session

### Request - User Speech Event
```bash
curl -X POST http://localhost:3000/sessions/session-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-001",
    "type": "user_speech",
    "payload": {
      "text": "Hello, I need to check my account balance",
      "duration": 3.5,
      "confidence": 0.95
    },
    "timestamp": "2026-04-06T10:43:00.000Z"
  }'
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "eventId": "event-001",
  "sessionId": "session-001",
  "type": "user_speech",
  "payload": {
    "text": "Hello, I need to check my account balance",
    "duration": 3.5,
    "confidence": 0.95
  },
  "timestamp": "2026-04-06T10:43:00.000Z",
  "createdAt": "2026-04-06T10:42:48.516Z",
  "updatedAt": "2026-04-06T10:42:48.516Z"
}
```

### Request - Bot Speech Event
```bash
curl -X POST http://localhost:3000/sessions/session-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-002",
    "type": "bot_speech",
    "payload": {
      "text": "Sure, let me fetch your account balance. Please hold.",
      "duration": 2.1,
      "voice": "en-US-Neural2-C"
    },
    "timestamp": "2026-04-06T10:43:05.000Z"
  }'
```

### Request - System Event
```bash
curl -X POST http://localhost:3000/sessions/session-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-003",
    "type": "system",
    "payload": {
      "action": "database_query",
      "query": "SELECT balance FROM accounts WHERE user_id = ?",
      "executionTime": 125,
      "result": {
        "balance": 5234.50,
        "currency": "USD"
      }
    },
    "timestamp": "2026-04-06T10:43:06.000Z"
  }'
```

### Duplicate Event (should fail with 409 Conflict)
```bash
curl -X POST http://localhost:3000/sessions/session-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-001",
    "type": "user_speech",
    "payload": {
      "text": "Duplicate event"
    },
    "timestamp": "2026-04-06T10:43:00.000Z"
  }'
```

Response:
```json
{
  "message": "Event already exists",
  "error": "Conflict",
  "statusCode": 409
}
```

---

## 3. Get Session with Events

### Request - Default pagination (limit=10, offset=0)
```bash
curl http://localhost:3000/sessions/session-001
```

### Request - Custom pagination
```bash
curl "http://localhost:3000/sessions/session-001?limit=5&offset=0"
```

### Response
```json
{
  "session": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "session-001",
    "status": "initiated",
    "language": "en",
    "startedAt": "2026-04-06T10:42:46.016Z",
    "metadata": {
      "userId": "user-123",
      "channel": "phone",
      "campaignId": "campaign-xyz"
    },
    "createdAt": "2026-04-06T10:42:46.018Z",
    "updatedAt": "2026-04-06T10:42:46.018Z"
  },
  "events": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "eventId": "event-001",
      "sessionId": "session-001",
      "type": "user_speech",
      "payload": {
        "text": "Hello, I need to check my account balance",
        "duration": 3.5,
        "confidence": 0.95
      },
      "timestamp": "2026-04-06T10:43:00.000Z",
      "createdAt": "2026-04-06T10:42:48.516Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "eventId": "event-002",
      "sessionId": "session-001",
      "type": "bot_speech",
      "payload": {
        "text": "Sure, let me fetch your account balance. Please hold.",
        "duration": 2.1,
        "voice": "en-US-Neural2-C"
      },
      "timestamp": "2026-04-06T10:43:05.000Z",
      "createdAt": "2026-04-06T10:42:49.516Z"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "eventId": "event-003",
      "sessionId": "session-001",
      "type": "system",
      "payload": {
        "action": "database_query",
        "query": "SELECT balance FROM accounts WHERE user_id = ?",
        "executionTime": 125,
        "result": {
          "balance": 5234.50,
          "currency": "USD"
        }
      },
      "timestamp": "2026-04-06T10:43:06.000Z",
      "createdAt": "2026-04-06T10:42:49.700Z"
    }
  ]
}
```

### Request - Non-existent session (should fail with 404)
```bash
curl http://localhost:3000/sessions/non-existent-session
```

Response:
```json
{
  "message": "Session not found",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 4. Complete Session

### Request
```bash
curl -X POST http://localhost:3000/sessions/session-001/complete \
  -H "Content-Type: application/json"
```

### Response
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "sessionId": "session-001",
  "status": "completed",
  "language": "en",
  "startedAt": "2026-04-06T10:42:46.016Z",
  "endedAt": "2026-04-06T10:44:30.000Z",
  "metadata": {
    "userId": "user-123",
    "channel": "phone",
    "campaignId": "campaign-xyz"
  },
  "createdAt": "2026-04-06T10:42:46.018Z",
  "updatedAt": "2026-04-06T10:44:30.000Z"
}
```

### Idempotent Complete (run again with same sessionId)
```bash
curl -X POST http://localhost:3000/sessions/session-001/complete \
  -H "Content-Type: application/json"
```

Response: **Same as above** (already completed)

---

## Full Workflow Example

#### Step 1: Create a new session
```bash
curl -X POST http://localhost:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "call-2026-04-06-001",
    "language": "fr",
    "metadata": {
      "callType": "support",
      "priority": "high"
    }
  }'
```

#### Step 2: Add user speech event
```bash
curl -X POST http://localhost:3000/sessions/call-2026-04-06-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "msg-1",
    "type": "user_speech",
    "payload": {
      "text": "Bonjour, je voudrais annuler ma commande",
      "language": "fr"
    },
    "timestamp": "2026-04-06T10:50:00.000Z"
  }'
```

#### Step 3: Add bot response
```bash
curl -X POST http://localhost:3000/sessions/call-2026-04-06-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "msg-2",
    "type": "bot_speech",
    "payload": {
      "text": "Bien sûr, je vais vous aider à annuler votre commande."
    },
    "timestamp": "2026-04-06T10:50:05.000Z"
  }'
```

#### Step 4: Add system event
```bash
curl -X POST http://localhost:3000/sessions/call-2026-04-06-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "sys-1",
    "type": "system",
    "payload": {
      "orderId": "ORD-123456",
      "action": "cancel_order",
      "status": "success"
    },
    "timestamp": "2026-04-06T10:50:06.000Z"
  }'
```

#### Step 5: Retrieve session with all events
```bash
curl http://localhost:3000/sessions/call-2026-04-06-001
```

#### Step 6: Complete the session
```bash
curl -X POST http://localhost:3000/sessions/call-2026-04-06-001/complete
```

---

## Validation Examples

### Invalid Event Type (should fail with 400)
```bash
curl -X POST http://localhost:3000/sessions/session-001/events \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-invalid",
    "type": "invalid_type",
    "payload": {},
    "timestamp": "2026-04-06T10:43:00.000Z"
  }'
```

### Missing Required Field (should fail with 400)
```bash
curl -X POST http://localhost:3000/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session-002"
  }'
```

### Invalid Pagination (should fail with 400)
```bash
curl "http://localhost:3000/sessions/session-001?limit=-5"
```

---

## Notes

- All timestamps should be ISO 8601 format
- `eventId` must be unique per session
- Payload is flexible - can contain any valid JSON
- Events are ordered by timestamp in responses
- All POST operations for session creation/completion are idempotent
