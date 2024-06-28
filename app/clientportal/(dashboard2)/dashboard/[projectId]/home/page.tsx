import HomeContent from "./HomeContent";
import { GetAllAcceptedOffersClient } from "@/components/actions/offers/OfferActions";

const priorityMap = {
  Low: 1,
  Medium: 2,
  High: 3,
  "Very High": 4,
  "Immediate Action": 5,
};

const HomePage = async () => {

  let offers = await GetAllAcceptedOffersClient();
  offers?.sort(
    (a, b) => priorityMap[b.task.priority!] - priorityMap[a.task.priority!]
  ); // again I hate enums, let's fix this

  if (!offers) {
    offers = [];
  }
  
  return (
    <div className="">
      <HomeContent offers={offers}/>
    </div>
    // <div className="flex justify-between mt-10 mb-10">
    //   <div className="w-9/12 h-full mr-10">
    //     <h1 className="font-bold text-4xl mb-10">Analytics</h1>
    //     <div className="flex justify-between">
    //       <motion.div
    //         initial={{ opacity: 0, scale: 0.5 }}
    //         animate={{ opacity: 1, scale: 1 }}
    //         transition={{ duration: 0.5 }}
    //       >
    //         <Card className="relative w-64 h-64">
    //           <CardContent className="flex justify-center items-center w-full h-full">
    //             <div className="w-full h-full mt-6">
    //               <h1 className="absolute font-bold text-md opacity-60">
    //                 Total Contracts
    //               </h1>
    //               <div className="w-full h-full flex justify-center items-center">
    //                 <h1 className="font-bold text-6xl">243</h1>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, scale: 0.5 }}
    //         animate={{ opacity: 1, scale: 1 }}
    //         transition={{ duration: 0.5 }}
    //       >
    //         <Card className="relative w-64 h-64">
    //           <CardContent className="flex justify-center items-center w-full h-full">
    //             <div className="w-full h-full mt-6">
    //               <h1 className="absolute font-bold text-md opacity-60">
    //                 Unseen Notifications
    //               </h1>
    //               <div className="w-full h-full flex justify-center items-center">
    //                 <h1 className="font-bold text-6xl">571</h1>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, scale: 0.5 }}
    //         animate={{ opacity: 1, scale: 1 }}
    //         transition={{ duration: 0.5 }}
    //       >
    //         <Card className="relative w-64 h-64">
    //           <CardContent className="flex justify-center items-center w-full h-full">
    //             <div className="w-full h-full mt-6">
    //               <h1 className="absolute font-bold text-md opacity-60">
    //                 Weekly Goal
    //               </h1>
    //               <div className="w-full h-full flex justify-center items-center">
    //                 <div className="w-5/6 h-5/6 bg-blue-5 mt-10">
    //                   <CircularProgressbar value={65} text="65" />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </motion.div>
    //     </div>
    //     <div className="w-full h-full flex justify-between space-x-5 mt-10">
    //       <Card className="relative w-full h-72">
    //         <CardContent className="flex justify-center items-center w-full h-full">
    //           <div className="w-full h-full mt-6">
    //             <h1 className="absolute font-bold text-md opacity-60">
    //               Supplies Sold
    //             </h1>
    //             <div className="w-full h-full flex justify-center items-center pt-5">
    //               <RandomBarChart height={240} />
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //       <Card className="relative w-full h-72">
    //         <CardContent className="flex justify-center items-center w-full h-full">
    //           <div className="w-full h-full mt-6">
    //             <h1 className="absolute font-bold text-md opacity-60">
    //               Total Contracts
    //             </h1>
    //             <div className="w-full h-full flex justify-center items-center pt-5">
    //               <RandomAreaChart height={240} />
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </div>
    //     <h1 className="font-bold text-4xl mb-10 mt-10">Tasks</h1>
    //     <div className="w-full h-full mt-10">
    //       <div className="border shadow-lg rounded-lg bg-white">
    //         <Table className="rounded-lg">
    //           <TableHeader className="">
    //             <TableRow>
    //               <TableHead className="w-[100px]">Priority</TableHead>
    //               <TableHead>Owner</TableHead>
    //               <TableHead>Status</TableHead>
    //               <TableHead>Company</TableHead>
    //               <TableHead>Description</TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {tasks.map((task) => (
    //               <TableRow key={task.id} className="">
    //                 <TableCell
    //                   className={`font-bold ${ChoosePriorityColor(
    //                     task.priority
    //                   )}`}
    //                 >
    //                   {task.priority}
    //                 </TableCell>
    //                 <TableCell>{task.owner}</TableCell>
    //                 <TableCell>{task.status}</TableCell>
    //                 <TableCell>{task.company}</TableCell>
    //                 <TableCell>{task.description}</TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-3/12 h-full grid grid-cols-1 gap-10">
    //     <Card className="relative w-full h-96">
    //       <CardContent>
    //         <RandomPieChart />
    //       </CardContent>
    //     </Card>
    //     <Card className="relative w-full h-96">
    //       <CardContent></CardContent>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default HomePage;
