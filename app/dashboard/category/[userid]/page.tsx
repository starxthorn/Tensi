"use server";
import DashboardWrapperManager from "@/components/ReusableComponents/DashboardWrapperManager";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserProduct from "@/components/FormComponents/UserProduct";
import EditUserProduct from "@/components/FormComponents/EditUserProduct";
import DeleteUserData from "@/components/FormComponents/DeleteUserData";
import {
  fetchCategories,
  fetchCompanies,
  fetchProducts,
  fetchUserData,
} from "@/lib/action";
import { ProductType } from "@/lib/type";
import { FaRegTrashAlt } from "react-icons/fa";
import { SearchInput } from "@/components/ui/SearchInput";

interface PropsTypes {
  searchParams?: Promise<{ query?: string }>;
  params: {
    userid: string;
  };
}

export default async function Page({ searchParams, params }: PropsTypes) {
  const products = (await fetchProducts(params.userid)) as ProductType[];
  const user = await fetchUserData(params.userid);
  const categories = await fetchCategories(params.userid);
  const compaines = await fetchCompanies(params.userid);
  const query = (await searchParams)?.query;
  const totalStock = products.reduce(
    (sum, product) => sum + (product.stock ?? 0),
    0
  );
  const totalStockPrice = products
    .reduce(
      (sum, product) => sum + (product.price ?? 0) * (product.stock ?? 0),
      0
    )
    .toLocaleString();

  const filteredProducts = query
    ? products.filter(
        (product: ProductType) =>
          product?.name &&
          product?.name.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  return (
    <DashboardWrapperManager>
      <div className="h-[50rem] -z-30 w-full bg-neutral-950 bg-grid-white/[0.05] absolute top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <section>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl lg:text-3xl">All Products</h1>
          <div className="flex items-center justify-center gap-4">
            <form action={`/dashboard/category/${params.userid}`}>
              <SearchInput
                id="query"
                name="query"
                defaultValue={query}
                className="w-[20vw]"
                placeholder="Search your Products"
                type="text"
              />
              <button type="submit" className="hidden"></button>
            </form>
            <UserProduct
              compaines={compaines}
              categories={categories}
              user={user}
            />
            <div>
              <h1>Stock: {totalStock}</h1>
            </div>
            <div>
              <h1>Stock Price: {totalStockPrice}</h1>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Model Number</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts
                .map((data: ProductType) => (
                  <TableRow key={data._id}>
                    <TableCell className="capitalize">{data.name}</TableCell>
                    <TableCell>{data.price?.toLocaleString()}</TableCell>
                    <TableCell
                      className={`${
                        (data.stock &&
                          (data.stock <= 5
                            ? "text-red-500"
                            : "text-green-500")) ||
                        (data.stock == 0 ? "text-red-500" : "text-green-500")
                      }`}
                    >
                      {data.stock}
                    </TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>{data.company}</TableCell>
                    <TableCell>{data.ModelNumber}</TableCell>
                    <TableCell>{data.SerialNumber}</TableCell>
                    <TableCell className="flex gap-4">
                      <EditUserProduct
                        categories={categories}
                        compaines={compaines}
                        productid={data._id}
                      />
                      <DeleteUserData
                        Api={"/product?productid"}
                        DataId={data._id}
                        DeleteComponent={
                          <FaRegTrashAlt className="hover:text-red-500 text-gray-500 transition-all text-lg cursor-pointer" />
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
                .reverse()
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-xl font-bold py-8 capitalize text-neutral-500"
                >
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </DashboardWrapperManager>
  );
}
