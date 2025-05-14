import { StateUpdate } from './types';

// SSE client management
type Client = {
  controller: ReadableStreamDefaultController;
};

// Store connected clients
const clients = new Set<Client>();

// Add a new client
export function addClient(controller: ReadableStreamDefaultController): Client {
  const client = { controller };
  clients.add(client);
  return client;
}

// Remove a client
export function removeClient(client: Client): void {
  clients.delete(client);
}

// Get current client count
export function getClientCount(): number {
  return clients.size;
}

// Helper to send SSE formatted messages
export function formatSSE(event: string, data: string): string {
  return `event: ${event}\ndata: ${data}\n\n`;
}

// Broadcast to all connected clients
export function broadcastUpdate(stateUpdate: StateUpdate): void {
  const data = formatSSE('state-update', JSON.stringify(stateUpdate));
  
  clients.forEach((client) => {
    try {
      client.controller.enqueue(new TextEncoder().encode(data));
    } catch (error) {
      console.error('Error broadcasting to client:', error);
      // If a client errors, remove it
      removeClient(client);
    }
  });
}