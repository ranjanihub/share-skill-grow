
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for user skills
const mockUserSkills = [
  { id: '1', title: 'Web Development', isVerified: false },
  { id: '2', title: 'Digital Marketing', isVerified: false },
  { id: '3', title: 'Graphic Design', isVerified: true }
];

// Mock quiz data - in a real app, this would come from an API
const mockQuizzes = {
  '1': [
    {
      id: 'q1',
      question: 'What does HTML stand for?',
      options: [
        'Hypertext Markup Language', 
        'Hypertext Markdown Language', 
        'Hyper Transfer Markup Language', 
        'High Tech Modern Language'
      ],
      correctAnswer: 0
    },
    {
      id: 'q2',
      question: 'Which CSS property is used to change the text color?',
      options: ['color', 'text-color', 'font-color', 'text-style'],
      correctAnswer: 0
    },
    {
      id: 'q3',
      question: 'Which JavaScript method is used to select an HTML element by its ID?',
      options: ['querySelector()', 'getElementById()', 'selectElement()', 'findElement()'],
      correctAnswer: 1
    },
    {
      id: 'q4',
      question: 'What is the correct way to include an external JavaScript file?',
      options: [
        '<script src="script.js"></script>',
        '<script href="script.js"></script>',
        '<javascript src="script.js"></javascript>',
        '<js src="script.js"></js>'
      ],
      correctAnswer: 0
    },
    {
      id: 'q5',
      question: 'Which HTTP status code represents a successful request?',
      options: ['200', '404', '500', '302'],
      correctAnswer: 0
    }
  ],
  '2': [
    {
      id: 'q1',
      question: 'What is SEO?',
      options: [
        'Search Engine Optimization', 
        'Search Engine Output', 
        'System Engine Output', 
        'Social Engine Optimization'
      ],
      correctAnswer: 0
    },
    {
      id: 'q2',
      question: 'Which platform is NOT used for social media marketing?',
      options: ['Instagram', 'Twitter/X', 'MongoDB', 'LinkedIn'],
      correctAnswer: 2
    },
    {
      id: 'q3',
      question: 'What is PPC in digital marketing?',
      options: ['Pay Per Click', 'Price Per Customer', 'Post Per Campaign', 'Product Placement Cost'],
      correctAnswer: 0
    },
    {
      id: 'q4',
      question: 'Which metric measures the percentage of visitors who leave after viewing only one page?',
      options: ['Click-through rate', 'Bounce rate', 'Conversion rate', 'Exit rate'],
      correctAnswer: 1
    }
  ],
  '3': [
    {
      id: 'q1',
      question: 'Which color mode is used for print design?',
      options: ['RGB', 'CMYK', 'HSL', 'HEX'],
      correctAnswer: 1
    },
    {
      id: 'q2',
      question: 'Which Adobe software is primarily used for vector graphics?',
      options: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
      correctAnswer: 1
    },
    {
      id: 'q3',
      question: 'What does DPI stand for in design?',
      options: ['Digital Print Indicator', 'Dots Per Inch', 'Design Pixel Interface', 'Document Process Integration'],
      correctAnswer: 1
    }
  ]
};

// Define the score threshold for verification (70%)
const VERIFICATION_THRESHOLD = 0.7;

const SkillVerificationForm = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [userSkills, setUserSkills] = useState(mockUserSkills);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm({
    defaultValues: {
      answers: {} as Record<string, string>
    }
  });

  useEffect(() => {
    // In a real app, fetch user skills from backend
    // For now, using mock data
  }, [user]);

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(skillId);
    setShowQuiz(false);
    setQuizSubmitted(false);
    
    const skill = userSkills.find(s => s.id === skillId);
    if (skill?.isVerified) {
      toast.info("This skill is already verified!");
      return;
    }
    
    const quizQuestions = mockQuizzes[skillId as keyof typeof mockQuizzes] || [];
    setCurrentQuestions(quizQuestions);
    
    if (quizQuestions.length > 0) {
      setShowQuiz(true);
      form.reset({ answers: {} });
    } else {
      toast.error("No quiz available for this skill");
    }
  };

  const onSubmit = (data: { answers: Record<string, string> }) => {
    // Calculate score
    let correctAnswers = 0;
    
    currentQuestions.forEach((question) => {
      const userAnswer = parseInt(data.answers[question.id] || '-1');
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = correctAnswers / currentQuestions.length;
    setScore(finalScore);
    
    // Check if passed
    const passed = finalScore >= VERIFICATION_THRESHOLD;
    setQuizPassed(passed);
    
    if (passed) {
      // Update user skills (in a real app, this would be an API call)
      setUserSkills(prev => prev.map(skill => 
        skill.id === selectedSkill ? { ...skill, isVerified: true } : skill
      ));
      
      toast.success("Congratulations! Your skill has been verified.");
    } else {
      toast.error("You didn't pass the verification. Please try again later.");
    }
    
    setQuizSubmitted(true);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Skill Verification</CardTitle>
        <CardDescription>
          Select a skill to verify through a short assessment
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skill">Select Skill to Verify</Label>
            <Select
              value={selectedSkill}
              onValueChange={handleSkillSelect}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                {userSkills.map((skill) => (
                  <SelectItem 
                    key={skill.id} 
                    value={skill.id}
                    disabled={skill.isVerified}
                  >
                    {skill.title}
                    {skill.isVerified && (
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {showQuiz && !quizSubmitted && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentQuestions.map((question, index) => (
                  <FormField
                    key={question.id}
                    control={form.control}
                    name={`answers.${question.id}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-medium">
                          {index + 1}. {question.question}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            {question.options.map((option: string, optionIndex: number) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem 
                                  value={optionIndex.toString()} 
                                  id={`${question.id}-${optionIndex}`} 
                                />
                                <Label htmlFor={`${question.id}-${optionIndex}`}>
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" className="w-full">Submit Assessment</Button>
              </form>
            </Form>
          )}
          
          {quizSubmitted && (
            <div className="p-6 border rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">
                {quizPassed ? "Verification Successful!" : "Verification Failed"}
              </h3>
              <p className="mb-4">
                {quizPassed 
                  ? "Congratulations! Your skill has been verified. A verification badge has been added to your skill."
                  : "Unfortunately, you didn't pass the verification. Please review and try again later."
                }
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Your score: {Math.round(score * 100)}% (Required: {VERIFICATION_THRESHOLD * 100}%)
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizSubmitted(false);
                    setSelectedSkill('');
                  }}
                >
                  Try Another Skill
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillVerificationForm;
