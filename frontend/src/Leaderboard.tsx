import { cn } from "@/lib/utils";

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

function Leaderboard() {
    return (
        <div className="flex flex-col items-center p-8 w-[512px] mx-auto gap-4">
            <h1 className="text-2xl my-16">Rankingi</h1>

            <UserLeaderboardEntry place={1} username="jacek" points={256} />
            <UserLeaderboardEntry place={2} username="jacek" points={256} />
            <UserLeaderboardEntry place={3} username="jacek" points={256} />
            <div className="w-full h-px bg-muted my-8"></div>
            <UserLeaderboardEntry place={4} username="jacek" points={256} />
            <UserLeaderboardEntry place={5} username="jacek" points={256} />

        </div>
    )
}

export default Leaderboard;