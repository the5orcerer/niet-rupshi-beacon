import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Mail, Phone, Linkedin } from "lucide-react";
import { ArticleActions } from "./ArticleActions";

interface FacultyMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email?: string;
  phone?: string;
  education?: string[];
  bio?: string;
  image_url?: string;
  linkedin_url?: string;
  research_interests?: string[];
}

interface FacultyCardProps {
  faculty: FacultyMember;
}

export const FacultyCard = ({ faculty }: FacultyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={faculty.image_url} alt={faculty.name} />
            <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{faculty.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-2 h-4 w-4" />
              {faculty.position}
            </div>
            <Badge variant="secondary" className="mt-2">
              {faculty.department}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        {faculty.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {faculty.bio}
          </p>
        )}
        <div className="space-y-2">
          {faculty.email && (
            <a href={`mailto:${faculty.email}`} className="flex items-center text-sm hover:text-primary">
              <Mail className="mr-2 h-4 w-4" />
              {faculty.email}
            </a>
          )}
          {faculty.phone && (
            <a href={`tel:${faculty.phone}`} className="flex items-center text-sm hover:text-primary">
              <Phone className="mr-2 h-4 w-4" />
              {faculty.phone}
            </a>
          )}
          {faculty.linkedin_url && (
            <a href={faculty.linkedin_url} target="_blank" rel="noopener noreferrer" 
               className="flex items-center text-sm hover:text-primary">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn Profile
            </a>
          )}
        </div>
        <ArticleActions articleId={faculty.id} />
      </CardContent>
    </Card>
  );
};
