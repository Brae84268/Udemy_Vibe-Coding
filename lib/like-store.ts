/**
 * 좋아요(투표) 저장소 (실습용 인메모리)
 * 방문자별로 좋아요 토글 가능. 서버 재시작 시 초기화됩니다.
 */

const likedVisitorIds = new Set<string>();
let likeCount = 0;

export function getLikeCount(): number {
  return likeCount;
}

export function isLikedByVisitor(visitorId: string): boolean {
  return likedVisitorIds.has(visitorId);
}

export function getLikeState(visitorId: string): { count: number; liked: boolean } {
  return {
    count: likeCount,
    liked: likedVisitorIds.has(visitorId),
  };
}

/**
 * 방문자 기준으로 좋아요 토글. 이미 좋아요한 상태면 취소, 아니면 추가.
 */
export function toggleLike(visitorId: string): { count: number; liked: boolean } {
  if (!visitorId) {
    return { count: likeCount, liked: false };
  }
  if (likedVisitorIds.has(visitorId)) {
    likedVisitorIds.delete(visitorId);
    likeCount = Math.max(0, likeCount - 1);
    return { count: likeCount, liked: false };
  }
  likedVisitorIds.add(visitorId);
  likeCount += 1;
  return { count: likeCount, liked: true };
}
