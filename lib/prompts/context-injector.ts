import { CASE_STUDIES_CONTEXT, type CaseStudyContext } from './case-studies';

interface ContextInjectionResult {
  relevantProjects: CaseStudyContext[];
  isInterviewQuestion: boolean;
  suggestedMaxTokens: number;
}

const INTERVIEW_KEYWORDS = [
  'process', 'approach', 'methodology', 'how do you', 'tell me about',
  'experience', 'background', 'career', 'journey', 'why did you',
  'what makes you', 'strengths', 'weaknesses', 'challenge', 'difficult',
  'team', 'leadership', 'manage', 'collaborate', 'work with',
  'learn', 'grow', 'improve', 'future', 'goals'
];

const CASUAL_KEYWORDS = [
  'hi', 'hello', 'hey', 'sup', 'what\'s up', 'how are you',
  'thanks', 'thank you', 'cool', 'nice', 'awesome', 'great',
  'bye', 'later', 'see you', 'ok', 'okay', 'sure'
];

export function injectContext(message: string): ContextInjectionResult {
  const lowerMessage = message.toLowerCase();

  // Check if it's a casual/short message
  const isCasual = CASUAL_KEYWORDS.some(keyword =>
    lowerMessage.includes(keyword) && lowerMessage.length < 30
  );

  if (isCasual) {
    return {
      relevantProjects: [],
      isInterviewQuestion: false,
      suggestedMaxTokens: 150
    };
  }

  // Check if it's an interview-style question
  const isInterviewQuestion = INTERVIEW_KEYWORDS.some(keyword =>
    lowerMessage.includes(keyword)
  );

  // Find relevant projects based on keywords
  const relevantProjects = CASE_STUDIES_CONTEXT.filter(project =>
    project.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))
  );

  // Determine token limit based on question type
  let suggestedMaxTokens = 250; // Default

  if (isInterviewQuestion) {
    suggestedMaxTokens = 400; // More detailed for interview questions
  }

  if (relevantProjects.length > 0) {
    suggestedMaxTokens = 350; // Detailed for project-specific questions
  }

  return {
    relevantProjects,
    isInterviewQuestion,
    suggestedMaxTokens
  };
}

export function buildContextPrompt(result: ContextInjectionResult): string {
  if (result.relevantProjects.length === 0) {
    return '';
  }

  const projectDetails = result.relevantProjects.map(project => `
### ${project.title} - ${project.subtitle}
Role: ${project.role} | Duration: ${project.duration} | Year: ${project.year}
Challenge: ${project.challenge}
Process: ${project.process}
Solution: ${project.solution}
Impact: ${project.impact}
`).join('\n');

  return `
## Relevant Project Context (use this to answer the question):
${projectDetails}
`;
}
