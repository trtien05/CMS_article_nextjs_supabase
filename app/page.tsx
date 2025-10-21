import Link from "next/link";
import { News } from "@/types/news";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, FileText } from "lucide-react";

async function getNews() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/news`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Home() {
  const news: News[] = await getNews();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            News Articles
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and browse all your news articles
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/news/create">
            <FileText className="mr-2 h-4 w-4" />
            Create New Article
          </Link>
        </Button>
      </div>

      {news.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No news articles yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first article!
            </p>
            <Button asChild>
              <Link href="/news/create">Create Article</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <Badge variant="secondary">News</Badge>
                </div>
                <CardDescription className="line-clamp-3">
                  {article.content}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(
                        article.created_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button asChild variant="default" className="flex-1">
                  <Link href={`/news/${article.id}`}>View</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/news/${article.id}/edit`}>Edit</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
