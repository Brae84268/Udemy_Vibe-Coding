"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export function ApiLabSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [likeCount, setLikeCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(true);
  const [likeSubmitting, setLikeSubmitting] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  const [recommendText, setRecommendText] = useState<string | null>(null);
  const [recommendLoading, setRecommendLoading] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem("like-visitor-id");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("like-visitor-id", id);
    }
    setVisitorId(id);
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (!res.ok) throw new Error("목록을 불러올 수 없습니다.");
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchLikeCount = async () => {
    if (!visitorId) return;
    try {
      const res = await fetch("/api/like", {
        headers: { "x-visitor-id": visitorId },
      });
      if (!res.ok) throw new Error("좋아요 수를 불러올 수 없습니다.");
      const data = await res.json();
      setLikeCount(typeof data.count === "number" ? data.count : 0);
      setLiked(Boolean(data.liked));
    } catch {
      setLikeCount(0);
      setLiked(false);
    } finally {
      setLikeLoading(false);
    }
  };

  useEffect(() => {
    if (!visitorId) return;
    fetchLikeCount();
  }, [visitorId]);

  const handleLikeClick = async () => {
    if (!visitorId) return;
    setLikeSubmitting(true);
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "x-visitor-id": visitorId },
      });
      const data = await res.json();
      if (res.ok) {
        if (typeof data.count === "number") setLikeCount(data.count);
        setLiked(Boolean(data.liked));
      }
    } finally {
      setLikeSubmitting(false);
    }
  };

  const fetchRecommend = async () => {
    setRecommendLoading(true);
    try {
      const res = await fetch("/api/recommend");
      if (!res.ok) throw new Error("추천을 불러올 수 없습니다.");
      const data = await res.json();
      setRecommendText(typeof data.text === "string" ? data.text : null);
    } catch {
      setRecommendText(null);
    } finally {
      setRecommendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !message.trim()) {
      setError("이름과 메시지를 모두 입력해 주세요.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "등록에 실패했습니다.");
        return;
      }
      setEntries(data.entries ?? []);
      setName("");
      setMessage("");
    } catch {
      setError("등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    setDeletingId(id);
    try {
      const res = await fetch(`/api/guestbook/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "삭제에 실패했습니다.");
        return;
      }
      setEntries(data.entries ?? []);
    } catch {
      setError("삭제에 실패했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("ko-KR", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <section
      id="api-lab"
      className="border-t border-border bg-muted/30 px-4 py-16"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          API 실습
        </p>
        <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">
          API로 실시간 테스트
        </h2>

        <Tabs defaultValue="guestbook" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guestbook">방명록</TabsTrigger>
            <TabsTrigger value="like">좋아요</TabsTrigger>
            <TabsTrigger value="random">랜덤 추천</TabsTrigger>
          </TabsList>

          <TabsContent value="guestbook" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">방명록 남기기</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestbook-name">이름</Label>
                      <Input
                        id="guestbook-name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                        disabled={submitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guestbook-message">메시지</Label>
                      <textarea
                        id="guestbook-message"
                        placeholder="메시지를 입력하세요"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={500}
                        disabled={submitting}
                        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        {message.length}/500
                      </p>
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "등록 중..." : "등록하기"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">방명록 목록</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground">불러오는 중...</p>
                  ) : entries.length === 0 ? (
                    <p className="text-muted-foreground">
                      아직 남긴 글이 없습니다. 첫 번째로 남겨 보세요!
                    </p>
                  ) : (
                    <ul className="space-y-3 max-h-[320px] overflow-y-auto">
                      {entries.map((entry) => (
                        <li
                          key={entry.id}
                          className="rounded-lg border border-border bg-background p-3 text-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-foreground">
                                {entry.name}
                              </p>
                              <p className="mt-1 text-muted-foreground">
                                {entry.message}
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {formatDate(entry.createdAt)}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDelete(entry.id)}
                              disabled={deletingId === entry.id}
                            >
                              {deletingId === entry.id ? "삭제 중..." : "삭제"}
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="like" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">좋아요 API 실습</CardTitle>
                <p className="text-muted-foreground text-sm">
                  좋아요를 누르면 1표 추가, 한 번 더 누르면 취소됩니다.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="mb-2 font-medium text-foreground">
                    이 포트폴리오가 마음에 드시나요?
                  </p>
                  {likeLoading ? (
                    <p className="text-muted-foreground">불러오는 중...</p>
                  ) : (
                    <p className="text-2xl font-bold text-foreground">
                      투표 결과: <span className="text-primary">{likeCount}</span>표
                    </p>
                  )}
                </div>
                <Button
                  size="lg"
                  variant={liked ? "secondary" : "default"}
                  onClick={handleLikeClick}
                  disabled={likeLoading || likeSubmitting}
                >
                  {likeSubmitting
                    ? "반영 중..."
                    : liked
                      ? "좋아요 취소"
                      : "좋아요"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="random" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">랜덤 추천 API 실습</CardTitle>
                <p className="text-muted-foreground text-sm">
                  바이브 코딩 격려 문구와 성공지식백과 스타일의 한 줄을 랜덤으로 불러옵니다.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-border bg-muted/50 p-4 min-h-[100px]">
                  {recommendLoading ? (
                    <p className="text-muted-foreground">불러오는 중...</p>
                  ) : recommendText ? (
                    <p className="text-foreground leading-relaxed">
                      &ldquo;{recommendText}&rdquo;
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      아래 버튼을 누르면 오늘의 한 줄 추천을 불러옵니다.
                    </p>
                  )}
                </div>
                <Button
                  size="lg"
                  onClick={fetchRecommend}
                  disabled={recommendLoading}
                >
                  {recommendLoading ? "불러오는 중..." : "오늘의 한 줄 추천"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
