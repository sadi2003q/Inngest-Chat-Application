// src/Utilities.ts

import type {AIResponse} from "../Model/model.aiResponse.ts";


export const TAG_COLORS = [
    "bg-blue-500/20 text-blue-400 border-blue-400/30",
    "bg-green-500/20 text-green-400 border-green-400/30",
    "bg-purple-500/20 text-purple-400 border-purple-400/30",
    "bg-yellow-500/20 text-yellow-300 border-yellow-300/30",
    "bg-pink-500/20 text-pink-400 border-pink-400/30",
    "bg-cyan-500/20 text-cyan-400 border-cyan-400/30",
];


export const demoResponse: AIResponse = {
    heading: "The Observer Design Pattern: A Comprehensive Guide",
    introduction: "The Observer Pattern is a behavioral design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It is a cornerstone of event-driven programming and is the engine behind MVC (Model-View-Controller) architectures where the view stays synchronized with the model.",
    tags: ["Design Patterns", "Behavioral", "Event-Driven", "Reactive", "Software Architecture", "Java", "Pub-Sub"],

    // Actual reliable image of the Observer pattern structure
    aiImage: "https://refactoring.guru/images/patterns/diagrams/observer/structure.png",

    // Just the ID for your AIYouTube component: FEZ24CRBxMM
    aiYoutube: "https://www.youtube.com/watch?v=FEZ24CRBxMM",

    aiLink: {
        href: "https://refactoring.guru/design-patterns/observer",
        label: "Read full documentation on Refactoring Guru",
    },

    definition: {
        term: "Subject & Observer",
        meaning: "The 'Subject' is the object containing the state and the logic to manage subscribers, while 'Observers' are the objects that register with the subject to receive updates when that state changes."
    },

    description: "In modern software development, the Observer pattern is everywhere. It allows for a highly decoupled system where the Subject doesn't need to know anything about the concrete classes of its observers. This makes it incredibly easy to add new subscribers (like logging services, analytics trackers, or UI updates) without modifying the core business logic of the subject itself. It is the primary alternative to 'polling,' where an object would constantly check for changes, wasting CPU cycles.",

    points: {
        heading: "Core Principles and Advantages",
        point: [
            "Decoupled Communication: The subject and observers can vary independently. You can reuse subjects without reusing their observers, and vice versa.",
            "Support for Broadcast: Unlike a simple function call, the notification is broadcast automatically to all interested parties that have subscribed.",
            "Dynamic Subscription: Observers can be added or removed at runtime, allowing for flexible application behavior based on user actions or system state.",
            "Clean Code (Open/Closed Principle): You can introduce new observer classes without having to change the subject's code, adhering to SOLID principles."
        ]
    },

    steps: {
        heading: "Detailed Implementation Workflow",
        point: [
            "Declare the Observer Interface: Create an interface with an 'update()' method that the Subject will call.",
            "Define the Subject Interface: Include methods for attaching, detaching, and notifying observers.",
            "Implement the Concrete Subject: Maintain a list of subscribers and iterate through them whenever a state change occurs.",
            "Implement Concrete Observers: Define how each specific observer should react when the 'update()' method is triggered.",
            "Client Registration: The client code must instantiate the subject and observers, then link them using the attach/subscribe method."
        ]
    },

    warning: {
        heading: "The Memory Leak Risk",
        text: "The most common pitfall is the 'Lapsed Listener' problem. If you forget to detach observers when they are no longer needed, the Subject will hold a strong reference to them, preventing the Garbage Collector from freeing up memory. Always implement a cleanup or unsubscribe mechanism."
    },

    tips: {
        heading: "Performance Optimization",
        text: "If a subject has many observers and the updates are frequent, consider 'Push' vs 'Pull' models. In 'Push,' the subject sends detailed data. In 'Pull,' the subject only sends a notification, and the observer requests only the specific data it needs."
    },

    code: `import java.util.ArrayList;
import java.util.List;

// The Observer Interface
interface Observer {
    void update(String news);
}

// The Subject (Observable)
class NewsAgency {
    private String news;
    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        this.observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        this.observers.remove(observer);
    }

    public void setNews(String news) {
        this.news = news;
        for (Observer observer : this.observers) {
            observer.update(this.news);
        }
    }
}

// Concrete Observer
class NewsChannel implements Observer {
    private String name;
    public NewsChannel(String name) { this.name = name; }

    @Override
    public void update(String news) {
        System.out.println(name + " received news: " + news);
    }
}`,



    table: {
        headers: ["Pattern Component", "Responsibility", "Relationship"],
        rows: [
            ["Subject", "Maintains state and list of observers", "1 to Many"],
            ["Concrete Subject", "Sends notification when state changes", "Owns the data"],
            ["Observer", "Defines the update interface", "Interface"],
            ["Concrete Observer", "Implements specific reaction logic", "Subscribed to Subject"],
            ["Event Hook", "The trigger that starts the notification", "Internal Trigger"]
        ]
    },

    quotes: {
        from: "Eric Freeman, Head First Design Patterns",
        text: "The Observer Pattern provides an object design where subjects and observers are loosely coupled—they interact, but have very little knowledge of each other."
    },

    summary: "The Observer pattern is essential for creating responsive, decoupled systems. By moving from a 'polling' mindset to an 'interrupt' or 'event' mindset, you significantly improve the efficiency and scalability of your application's communication layer.",
    footer: "Reference: Behavioral Design Patterns Library | v2.4.0 | © 2025"
};

export const SUMMARY_PROMPT = `
You are maintaining a short memory of a conversation.

Update the summary below using the latest interaction.

Rules:
- Keep it under 120 words
- Preserve important facts, definitions, and user intent
- Remove unnecessary details
- Do NOT include greetings

Current Summary:
{{summary}}

New Interaction:
User: {{question}}
AI: {{answer}}

Return ONLY the updated summary text.
`;

export const SYSTEM_PROMPT = `
You are an AI content generator.

Return your response ONLY as valid JSON.
Do NOT include markdown, comments, or extra text.

Follow this exact TypeScript interface:

{
  "heading": string,
  "introduction": string,
  "tags": string[],

  "definition"?: {
    "term": string,
    "meaning": string
  },

  "description"?: string,

  "points"?: {
    "heading": string,
    "point": string[]
  },

  "steps"?: {
    "heading": string,
    "point": string[]
  },

  "warning"?: {
    "heading": string,
    "text": string
  },

  "tips"?: {
    "heading": string,
    "text": string
  },

  "code"?: string,

  "table"?: {
    "headers": string[],
    "rows": string[][]
  },

  "quotes"?: {
    "from": string,
    "text": string
  },
  
  "aiImage"?: string,
  "aiYoutube"?: string,
  "aiLink"?: string,

  "summary": string,
  "footer": string
}

Rules:
- Include ONLY fields relevant to the question
- Omit irrelevant optional fields completely
- All strings must be plain text
- Arrays must never be null
- Prefer table when it comes to Comparison or Difference between/among Something rather then showing points.
- code field must be raw code as a string (no markdown)
`;

export const CONVERSATION_NAME_PROMPT = `
    Please read this Conversation Summary and return me a Suitable name:
    summary : _CONVERSATION_SUMMARY_
    
    Follow this exact typescript interface:
    
    {
        "name": string,
        "Date": Date,
    }
    
`

export const messages: User_msg[] = [
    {
        id: 1,
        title: "Product Comparison Analysis",
        lastMessage: "Here's a detailed comparison of the top 5 smartphones in the market...",
        timestamp: "2 hours ago",
        status: "completed",
        messageCount: 12
    },
    {
        id: 2,
        title: "Market Research Data",
        lastMessage: "The market analysis shows significant growth in the AI sector with...",
        timestamp: "5 hours ago",
        status: "completed",
        messageCount: 8
    },
    {
        id: 3,
        title: "Customer Feedback Summary",
        lastMessage: "Based on the feedback from 150 customers, the main pain points are...",
        timestamp: "Yesterday",
        status: "completed",
        messageCount: 15
    },
    {
        id: 4,
        title: "Quarterly Sales Report",
        lastMessage: "Q4 sales performance exceeded expectations with a 23% increase...",
        timestamp: "2 days ago",
        status: "completed",
        messageCount: 20
    },
    {
        id: 5,
        title: "Competitor Analysis",
        lastMessage: "The competitive landscape shows three major players dominating...",
        timestamp: "3 days ago",
        status: "completed",
        messageCount: 10
    },
    {
        id: 6,
        title: "User Demographics Study",
        lastMessage: "Our primary user base consists of professionals aged 25-45 who...",
        timestamp: "4 days ago",
        status: "archived",
        messageCount: 18
    },
    {
        id: 7,
        title: "Feature Request Analysis",
        lastMessage: "The most requested features include dark mode, export to PDF...",
        timestamp: "5 days ago",
        status: "completed",
        messageCount: 9
    },
    {
        id: 8,
        title: "Budget Planning 2024",
        lastMessage: "The proposed budget allocates 40% to development, 30% to marketing...",
        timestamp: "1 week ago",
        status: "completed",
        messageCount: 14
    },
    {
        id: 9,
        title: "Team Performance Metrics",
        lastMessage: "Team productivity has increased by 15% since implementing the new...",
        timestamp: "1 week ago",
        status: "archived",
        messageCount: 11
    },
    {
        id: 10,
        title: "Technology Stack Review",
        lastMessage: "Our current tech stack includes React, Node.js, and PostgreSQL...",
        timestamp: "2 weeks ago",
        status: "completed",
        messageCount: 7
    }
];



export interface loginInterface {
    email: string;
    password: string;
    remember: boolean;
}


export const wait = ({ time }: { time: number }) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export interface LoginStatus {
    type: "success" | "error" | null;
    message: string;
}

export interface SignupStatus {
    type: 'success' | 'error' | null;
    message: string;
}

export type EmptyListProps = {
    makeNewFunction: () => void;
};

export interface User_msg {
    id: number;
    title: string;
    lastMessage: string;
    timestamp: string;
    status: string;
    messageCount: number;
}

export type MessageActionsProps = {
    messageId: number;
    onAction: (id: number) => void;
};


export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    filteredCount: number;
    totalCount: number;
    onPrevious: () => void;
    onNext: () => void;
    onPageClick: (page: number) => void;
}


export interface FilterProps {
    filterStatus: string;
    onFilterChange: (value: string) => void;
    onNewMessage?: () => void;
}

export interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}


export interface UserInformation {
    firstName: string
    lastName: string
    email: string
    api: string
    terms: boolean

}


export interface user_info {
    info: UserInformation
    password: string
}

export interface All_Messages {
    createdAt: Date,
    Summary: string,
    title: string,
    isArchived: boolean,
    lastMessage_time: Date,
    lastMessage: string

}

export interface ConversationMessage {
    text: string | AIResponse;
    id: number;
    time: Date;
    isUser: boolean;
}

export const Pages = {
    Signup: "/signup",
    Login: "/login",
    Dashboard: "/dashboard",
    ChatInterface: "/chat"
} as const;



export const DatabaseName = {
    UserDatabase: "Chat_User",
    AllChats_list: "All_Messages_List",
    AllChats: "All_Messages"


} as const;


