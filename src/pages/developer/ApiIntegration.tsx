
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

const ApiIntegration = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard");
  };

  return (
    <DeveloperLayout>
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Integration Guide</h1>
          <p className="text-muted-foreground mt-2">
            Learn how to integrate your AI agent with the AgentCupid platform
          </p>
        </div>

        <Tabs defaultValue="quick-start">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick-start" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Follow these steps to integrate your AI agent with AgentCupid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 1: Register Your Agent</h3>
                  <p className="text-muted-foreground">
                    Before you can integrate your AI agent, you need to register it on the platform by 
                    completing the agent submission form with all required details.
                  </p>
                  <Button variant="outline" className="mt-2" onClick={() => window.location.href = "/developer/agents/new"}>
                    Register New Agent
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 2: Get Your API Keys</h3>
                  <p className="text-muted-foreground">
                    Once your agent is approved, you'll receive API credentials to authenticate your requests. 
                    Keep these secure and never commit them to public repositories.
                  </p>
                  <div className="mt-4 bg-muted p-4 rounded-md relative">
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                      <code>
                        {`API_KEY=ac_dev_xxxxxxxxxxxxxxxxxxxx
API_SECRET=ac_secret_xxxxxxxxxxxxxxxxxxxx
ENVIRONMENT=production`}
                      </code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`API_KEY=ac_dev_xxxxxxxxxxxxxxxxxxxx
API_SECRET=ac_secret_xxxxxxxxxxxxxxxxxxxx
ENVIRONMENT=production`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 3: Set Up Your Agent Endpoint</h3>
                  <p className="text-muted-foreground">
                    Create an endpoint on your server that receives requests from AgentCupid and 
                    returns responses from your AI agent.
                  </p>
                  <div className="mt-4 bg-muted p-4 rounded-md relative">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="h-4 w-4" />
                      <span className="text-sm font-medium">Example Endpoint (Node.js/Express)</span>
                    </div>
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground overflow-x-auto">
                      <code>
{`const express = require('express');
const app = express();
app.use(express.json());

app.post('/agent/process', (req, res) => {
  // Authenticate the request
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.AC_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Extract user input from request
  const { input, context, user } = req.body;
  
  // Process with your AI agent logic here
  const response = processWithYourAgent(input, context);
  
  // Return the response
  res.json({
    response: response.text,
    confidence: response.confidence,
    metadata: response.metadata
  });
});

app.listen(3000, () => {
  console.log('Agent endpoint running on port 3000');
});`}
                      </code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`const express = require('express');
const app = express();
app.use(express.json());

app.post('/agent/process', (req, res) => {
  // Authenticate the request
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.AC_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Extract user input from request
  const { input, context, user } = req.body;
  
  // Process with your AI agent logic here
  const response = processWithYourAgent(input, context);
  
  // Return the response
  res.json({
    response: response.text,
    confidence: response.confidence,
    metadata: response.metadata
  });
});

app.listen(3000, () => {
  console.log('Agent endpoint running on port 3000');
});`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 4: Register Your Webhook</h3>
                  <p className="text-muted-foreground">
                    In your developer dashboard, register the URL of your endpoint so AgentCupid can 
                    forward user requests to your agent.
                  </p>
                  <Button variant="outline" className="mt-2" onClick={() => window.location.href = "/developer/agents"}>
                    Configure Webhooks
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 5: Test Your Integration</h3>
                  <p className="text-muted-foreground">
                    Use our testing tools to verify your agent is responding correctly before making 
                    it available to users.
                  </p>
                  <Button className="mt-2" onClick={() => window.location.href = "/developer/agents"}>
                    Test Your Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="authentication" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Secure your API communications with proper authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">API Key Authentication</h3>
                  <p className="text-muted-foreground">
                    All requests to and from the AgentCupid platform use API key authentication. Your agent
                    will receive requests with an API key in the header, and you should verify this key
                    matches your assigned key.
                  </p>
                  <div className="mt-4 bg-muted p-4 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <Terminal className="h-4 w-4" />
                      <span className="text-sm font-medium">Request Header Example</span>
                    </div>
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                      <code>
{`X-API-Key: ac_dev_xxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
X-Agent-Version: 1.0.0`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Webhook Verification</h3>
                  <p className="text-muted-foreground">
                    To ensure webhooks are actually coming from AgentCupid, each webhook request includes
                    a signature you can verify.
                  </p>
                  <div className="mt-4 bg-muted p-4 rounded-md relative">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="h-4 w-4" />
                      <span className="text-sm font-medium">Webhook Signature Verification (Node.js)</span>
                    </div>
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground overflow-x-auto">
                      <code>
{`const crypto = require('crypto');

function verifyWebhookSignature(req) {
  const signature = req.headers['x-ac-signature'];
  const timestamp = req.headers['x-ac-timestamp'];
  const body = JSON.stringify(req.body);
  
  // Verify timestamp is recent (within 5 minutes)
  const now = Math.floor(Date.now() / 1000);
  if (now - parseInt(timestamp) > 300) {
    return false;
  }
  
  // Create signature to compare
  const signatureData = timestamp + '.' + body;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(signatureData)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}
                      </code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`const crypto = require('crypto');

function verifyWebhookSignature(req) {
  const signature = req.headers['x-ac-signature'];
  const timestamp = req.headers['x-ac-timestamp'];
  const body = JSON.stringify(req.body);
  
  // Verify timestamp is recent (within 5 minutes)
  const now = Math.floor(Date.now() / 1000);
  if (now - parseInt(timestamp) > 300) {
    return false;
  }
  
  // Create signature to compare
  const signatureData = timestamp + '.' + body;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(signatureData)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="endpoints" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  Available endpoints for agent integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Endpoint</th>
                        <th className="text-left py-3 px-2">Method</th>
                        <th className="text-left py-3 px-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-mono text-sm">/api/v1/agent/process</td>
                        <td className="py-3 px-2">POST</td>
                        <td className="py-3 px-2">Process user input and generate agent response</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-mono text-sm">/api/v1/agent/status</td>
                        <td className="py-3 px-2">GET</td>
                        <td className="py-3 px-2">Check agent availability and status</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-mono text-sm">/api/v1/agent/feedback</td>
                        <td className="py-3 px-2">POST</td>
                        <td className="py-3 px-2">Record user feedback about agent responses</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-mono text-sm">/api/v1/agent/metrics</td>
                        <td className="py-3 px-2">GET</td>
                        <td className="py-3 px-2">Retrieve usage statistics for your agent</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Request Format</h3>
                  <p className="text-muted-foreground mb-2">
                    When a user interacts with your agent, AgentCupid will send a request to your
                    webhook URL with the following format:
                  </p>
                  <div className="bg-muted p-4 rounded-md relative">
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground overflow-x-auto">
                      <code>
{`{
  "input": {
    "text": "How can I automate my email responses?",
    "attachments": []
  },
  "context": {
    "conversation_id": "conv_12345",
    "messages": [
      {
        "role": "user",
        "content": "I need help with email automation",
        "timestamp": "2023-04-11T14:22:10Z"
      },
      {
        "role": "assistant",
        "content": "I'd be happy to help with email automation. What specific challenges are you facing?",
        "timestamp": "2023-04-11T14:22:15Z"
      }
    ]
  },
  "user": {
    "id": "user_6789",
    "preferences": {
      "industry": "marketing",
      "response_style": "concise"
    }
  },
  "metadata": {
    "platform": "web",
    "timezone": "America/Los_Angeles"
  }
}`}
                      </code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`{
  "input": {
    "text": "How can I automate my email responses?",
    "attachments": []
  },
  "context": {
    "conversation_id": "conv_12345",
    "messages": [
      {
        "role": "user",
        "content": "I need help with email automation",
        "timestamp": "2023-04-11T14:22:10Z"
      },
      {
        "role": "assistant",
        "content": "I'd be happy to help with email automation. What specific challenges are you facing?",
        "timestamp": "2023-04-11T14:22:15Z"
      }
    ]
  },
  "user": {
    "id": "user_6789",
    "preferences": {
      "industry": "marketing",
      "response_style": "concise"
    }
  },
  "metadata": {
    "platform": "web",
    "timezone": "America/Los_Angeles"
  }
}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Response Format</h3>
                  <p className="text-muted-foreground mb-2">
                    Your agent should respond with a JSON object in the following format:
                  </p>
                  <div className="bg-muted p-4 rounded-md relative">
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground overflow-x-auto">
                      <code>
{`{
  "response": {
    "text": "To automate your email responses, you can set up rules in Gmail or use a tool like Zapier to create automated workflows. Would you like me to explain how to set up specific automation rules?",
    "attachments": [],
    "suggested_actions": [
      {
        "type": "link",
        "text": "Set up Gmail filters",
        "url": "https://support.google.com/mail/answer/6579"
      },
      {
        "type": "button",
        "text": "Show me Zapier integration",
        "action": "show_zapier"
      }
    ]
  },
  "confidence": 0.92,
  "metadata": {
    "processing_time": 0.8,
    "sources": [
      {
        "name": "Gmail Documentation",
        "url": "https://support.google.com/mail"
      }
    ]
  }
}`}
                      </code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`{
  "response": {
    "text": "To automate your email responses, you can set up rules in Gmail or use a tool like Zapier to create automated workflows. Would you like me to explain how to set up specific automation rules?",
    "attachments": [],
    "suggested_actions": [
      {
        "type": "link",
        "text": "Set up Gmail filters",
        "url": "https://support.google.com/mail/answer/6579"
      },
      {
        "type": "button",
        "text": "Show me Zapier integration",
        "action": "show_zapier"
      }
    ]
  },
  "confidence": 0.92,
  "metadata": {
    "processing_time": 0.8,
    "sources": [
      {
        "name": "Gmail Documentation",
        "url": "https://support.google.com/mail"
      }
    ]
  }
}`)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Configure webhooks to receive real-time events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Available Events</h3>
                  <p className="text-muted-foreground">
                    You can subscribe to these events to receive real-time notifications:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>agent.conversation.started - When a user starts a new conversation</li>
                    <li>agent.message.received - When a user sends a message</li>
                    <li>agent.feedback.received - When a user provides feedback</li>
                    <li>agent.subscription.created - When a user subscribes to your agent</li>
                    <li>agent.subscription.canceled - When a user cancels their subscription</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Webhook Setup</h3>
                  <p className="text-muted-foreground">
                    Configure your webhook endpoints in the developer dashboard. For each event
                    type, you can specify a different URL or use the same URL for all events.
                  </p>
                  <Button variant="outline" className="mt-2" onClick={() => window.location.href = "/developer/agents"}>
                    Configure Webhooks
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Testing Webhooks</h3>
                  <p className="text-muted-foreground mb-2">
                    You can test your webhook integration with our testing tool. This will send
                    a sample event to your webhook URL to verify your server is properly
                    receiving and processing the events.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <Terminal className="h-4 w-4" />
                      <span className="text-sm font-medium">Sample Webhook Payload</span>
                    </div>
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground overflow-x-auto">
                      <code>
{`{
  "event": "agent.message.received",
  "created_at": "2023-04-11T15:30:22Z",
  "data": {
    "conversation_id": "conv_12345",
    "message": {
      "id": "msg_67890",
      "text": "Can your agent help with email automation?",
      "user_id": "user_6789",
      "timestamp": "2023-04-11T15:30:20Z"
    },
    "agent_id": "agent_54321"
  }
}`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Webhook Reliability</h3>
                  <p className="text-muted-foreground">
                    Webhooks use a retry mechanism with exponential backoff if your server doesn't
                    respond with a 2xx status code. We'll attempt delivery up to 5 times over a
                    period of 24 hours before giving up.
                  </p>
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm font-medium text-amber-800">Best Practices</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-amber-700">
                      <li>Respond quickly to webhook events (within 5 seconds)</li>
                      <li>Return a 2xx status code even if you'll process the event asynchronously</li>
                      <li>Implement idempotency to handle duplicate events</li>
                      <li>Store webhook events in your database before processing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DeveloperLayout>
  );
};

export default ApiIntegration;
