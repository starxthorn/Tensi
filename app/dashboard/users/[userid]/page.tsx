"use server";
import DashboardWrapperManager from "@/components/ReusableComponents/DashboardWrapperManager";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerType, UserType } from "@/lib/type";
import {
  fetchCustomers,
  fetchUserData,
  filterAndDeleteCustomers,
} from "@/lib/action";
import Link from "next/link";
import Button from "@/components/ReusableComponents/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import DeleteUserData from "@/components/FormComponents/DeleteUserData";
import { months } from "@/lib/constant";
import SendMessage from "@/components/FormComponents/SendMessage";
import { FaLink } from "react-icons/fa6";

interface PropsTypes {
  params: {
    userid: string;
  };
  searchParams: Promise<{
    query?: string;
    day?: string;
    status?: string;
  }>;
}

export default async function Page({ params, searchParams }: PropsTypes) {
  const { query, day = `${new Date().getDate()}`, status } = await searchParams;

  // If query or status is provided, override day to "all"
  const dayToFilter = query || status === "pending" ? "all" : day;

  const customers = (await fetchCustomers(params.userid)) as CustomerType[];
  const date = formatDate(new Date());
  const currentMonth = new Date().getMonth();
  const currentDateMonth = months.filter((m) => m.number === currentMonth);
  const user = (await fetchUserData(params.userid)) as UserType;

  // Adding Loop for days
  const daysArray = [];
  for (let i = 1; i <= 31; i++) {
    daysArray.push(`${i}`);
  }

  const filteredCustomers = customers?.filter((customer: CustomerType) => {
    const timelimit = Number(customer?.TimeLimit);
    const customerCreatedAt = new Date(customer.createdAt as Date);
    const customerDay = customerCreatedAt.getDate();

    const calculatedTargetDay = customerDay + timelimit;
    const totalDaysInCurrentMonth = Number(currentDateMonth[0]?.days) ?? 31;
    const adjustedTargetDay = Math.min(
      calculatedTargetDay,
      totalDaysInCurrentMonth
    );

    // Apply filters independently of the day filter
    const matchesDay =
      dayToFilter === "all" || adjustedTargetDay === Number(dayToFilter);
    const matchesQuery = query
      ? customer.name?.toLowerCase().includes(query.toLowerCase().trim())
      : true;
    const matchesStatus =
      status === "pending" ? customer.status === "pending" : true;

    // Only return customers who meet the specified conditions
    return (
      (matchesDay || dayToFilter === "all") && matchesQuery && matchesStatus
    );
  });

  await filterAndDeleteCustomers(params.userid);

  return (
    <DashboardWrapperManager>
      <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <section>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl lg:text-3xl">All Customers</h1>
          <div className="flex items-center justify-center gap-4">
            <form
              action={`/dashboard/users/${params.userid}`}
              className="flex items-center justify-center gap-4 w-[14rem]"
            >
              <Select name="day" defaultValue={dayToFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-neutral-400"
                    placeholder={`Day ${date}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {daysArray.map((i) => (
                    <SelectItem
                      key={i}
                      id="day"
                      className="capitalize cursor-pointer"
                      value={i}
                    >
                      Day {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="px-6" btnType="submit">
                Filter
              </Button>
            </form>
            <form name="status" action={`/dashboard/users/${params.userid}`}>
              <input type="hidden" name="status" value={"pending"} />
              <Button btnType="submit" className="px-4">
                Pending
              </Button>
            </form>
            <form action={`/dashboard/users/${params.userid}`}>
              <SearchInput
                id="query"
                name="query"
                defaultValue={query}
                className="w-[16vw]"
                placeholder="Search your Customers"
                type="text"
              />
              <button type="submit" className="hidden"></button>
            </form>
            <Link href={`/dashboard/create-customer/${params.userid}`}>
              <Button className="px-6">Create Customer</Button>
            </Link>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Advance</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>To Pay</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers && filteredCustomers.length > 0 ? (
              filteredCustomers
                .map((data: CustomerType) => (
                  <TableRow key={data._id}>
                    <TableCell className="capitalize">
                      <Link
                        href={`/print-sale/${data._id}`}
                        className="hover:underline transition-all"
                      >
                        {data.name}
                      </Link>
                    </TableCell>
                    <TableCell>{data.phone}</TableCell>
                    <TableCell>{data.advance?.toLocaleString()}</TableCell>
                    <TableCell>{data?.paid?.toLocaleString()}</TableCell>
                    <TableCell>
                      {data?.product?.price &&
                        data.paid &&
                        (+data.product.price - +data.paid).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {data?.product?.price?.toLocaleString()}
                    </TableCell>
                    <TableCell>{data?.product?.name}</TableCell>
                    <TableCell>
                      {data?.product?.price &&
                      data.paid &&
                      +data.product.price !== +data.paid ? (
                        <span className="text-red-500">Not Done</span>
                      ) : (
                        <span className="text-green-500">Completed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {data?.status && data.status === "pending" ? (
                        <span className="text-red-500">Pending</span>
                      ) : (
                        <span className="text-green-500">Active</span>
                      )}
                    </TableCell>
                    <TableCell className="flex gap-4">
                      <Link href={`/dashboard/users/edit-customer/${data._id}`}>
                        <FaEdit className="hover:text-white text-gray-500 transition-all text-lg cursor-pointer" />
                      </Link>
                      <DeleteUserData
                        Api={"/customer?customerid"}
                        DataId={data._id}
                        DeleteComponent={
                          <FaRegTrashAlt className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer" />
                        }
                      />
                      <Link href={`/dashboard/invoice/${data._id}`}>
                        <FaLink className="hover:text-white text-gray-500 transition-all text-lg cursor-pointer" />
                      </Link>
                      <SendMessage
                        ShopName={user.ShopName ?? ""}
                        name={data.name ?? ""}
                        price={data?.product?.price ?? 0}
                        phone={data.phone ?? 0}
                        advance={data.advance ?? 0}
                        product={data?.product?.name ?? ""}
                        MonthlyInstallment={data.MonthlyInstallment ?? 0}
                      />
                    </TableCell>
                  </TableRow>
                ))
                .reverse()
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center text-xl font-bold py-8 capitalize text-neutral-500"
                >
                  No Customer Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </DashboardWrapperManager>
  );
}
