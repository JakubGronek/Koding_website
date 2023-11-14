import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./globals";
import { useAuth } from "./useAuth";

interface UserLeaderboardEntryProps {
    place: number,
    username: string,
    points: number
}

function UserLeaderboardEntry({ place, username, points }: UserLeaderboardEntryProps) {
    return (
        <div className={cn("flex flex-row items-center rounded-md border w-full gap-4", place <= 3 ? "h-16" : "h-12")}>
            <span className={cn("flex items-center w-16 h-full justify-center rounded-l-md",
                place <= 3 ? "text-xl font-extrabold" : "", 
                place === 1 ? "bg-[#bfa632] text-black" : "",
                place === 2 ? "bg-slate-600" : "",
                place === 3 ? "bg-[#5e3b17]" : "")}>
                {place}.
            </span>
            <span className={cn("font-medium", place <= 3 ? "" : "text-sm")}>
                {username}
            </span>
            <span className="text-sm ml-auto mr-4">{points} pkt.</span>
        </div>
    )
}

interface LeaderboardUser {
    username: string,
    points: number
}

function Leaderboard() {
    const { token } = useAuth();
    const [ users, setUsers ] = useState<LeaderboardUser[]>([]);

    const fetchLeaderboard = async () => {
        const res = await fetch(API_BASE_URL + "/api/scoreboard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token
            }
        })

        if (res.ok) {
            const scoreboard = await res.json();
            setUsers(scoreboard);
        }
    }

    useEffect(() => {
        fetchLeaderboard();
    }, [])

    return (
        <div className="flex flex-col items-center p-8 w-[512px] mx-auto gap-4">
            <h1 className="text-2xl my-16">Rankingi</h1>
            {
                users.map((v, i) => {
                    return (
                        <UserLeaderboardEntry place={i+1} username={v.username} points={v.points} />
                    )
                })
            }
        </div>
    )
}

export default Leaderboard;