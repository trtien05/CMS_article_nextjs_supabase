import Link from "next/link";
import { News } from "@/types/news";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Edit,
  Clock,
} from "lucide-react";
import DeleteButton from "@/app/news/[id]/DeleteButton";

async function getNewsById(id: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/news/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function NewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const article: News = await getNewsById(params.id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-bold mb-2">
              Article Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The article you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            Back to all articles
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge>News</Badge>
              </div>
              <CardTitle className="text-4xl">
                {article.title}
              </CardTitle>
            </div>
          </div>

          <CardDescription className="flex flex-wrap gap-x-4 gap-y-2 text-base">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(article.created_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
            {article.updated_at !== article.created_at && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  Updated:{" "}
                  {new Date(article.updated_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-foreground leading-relaxed">
              {article.content}
            </p>
          </div>

          <div className="flex gap-2 border-t pt-6">
            <Button asChild variant="default">
              <Link href={`/news/${article.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Article
              </Link>
            </Button>
            <DeleteButton id={article.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
