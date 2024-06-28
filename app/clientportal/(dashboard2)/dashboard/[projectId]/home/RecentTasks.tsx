import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentTasks() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sarah Lynn</p>
          <p className="text-sm text-muted-foreground">For Zform</p>
        </div>
        <div className="ml-auto font-medium text-green-500">2 Requets</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Doe</p>
          <p className="text-sm text-muted-foreground">For Home Depot</p>
        </div>
        <div className="ml-auto font-medium text-green-500">1 Request</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>DT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">David Turner</p>
          <p className="text-sm text-muted-foreground">For Constructo</p>
        </div>
        <div className="ml-auto font-medium text-green-500">3 Requests</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>PZ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Peter Zoe</p>
          <p className="text-sm text-muted-foreground">For Cuber</p>
        </div>
        <div className="ml-auto font-medium text-yellow-500">4 Requests</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>OT</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Oliver Tilly</p>
          <p className="text-sm text-muted-foreground">For Zform</p>
        </div>
        <div className="ml-auto font-medium text-red-500">11 Requests</div>
      </div>
    </div>
  );
}
