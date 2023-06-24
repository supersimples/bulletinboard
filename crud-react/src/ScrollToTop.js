import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 다른 페이지 이동 시 스크롤을 맨 위로 초기화
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

}