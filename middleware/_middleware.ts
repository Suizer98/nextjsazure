// middleware/_middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { basicAuthentication } from "./basicAuthentication"; // Ensure this utility is implemented

export function middleware(request: NextRequest) {
  return basicAuthentication(request);
}
