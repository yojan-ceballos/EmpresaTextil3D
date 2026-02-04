# Builder Stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod ./
# COPY go.sum ./
# RUN go mod download

COPY . .

RUN go build -o server ./cmd/server

# Runner Stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/server .
COPY --from=builder /app/assets ./assets

EXPOSE 3001

CMD ["./server"]
