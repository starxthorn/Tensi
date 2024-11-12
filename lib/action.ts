"use server";

import { CustomerType } from "./type";

const baseUrl = "https://tensi-data-management-web-software.vercel.app";

export async function fetchUserData(uid: string | undefined | null) {
  try {
    const response = await fetch(`${baseUrl}/api/access-user?userid=${uid}`, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      return data.response;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCategories(uid: string | undefined | null) {
  try {
    const response = await fetch(
      `${baseUrl}/api/access-categories?userid=${uid}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProducts(uid: string | undefined | null) {
  try {
    const response = await fetch(
      `${baseUrl}/api/access-products?userid=${uid}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSingleProduct(pid: string | undefined | null) {
  try {
    const response = await fetch(`${baseUrl}/api/product?productid=${pid}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCompanies(uid: string | undefined | null) {
  try {
    const response = await fetch(
      `${baseUrl}/api/access-companies?userid=${uid}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCustomers(uid: string | null | undefined) {
  try {
    if (uid) {
      const response = await fetch(
        `${baseUrl}/api/access-customers?userid=${uid}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      return data.response;
    }
  } catch (error) {
    console.error("Error in fetchCustomers:", error);
  }
}

export async function fetchSingleCustomer(cid: string | undefined | null) {
  try {
    const response = await fetch(`${baseUrl}/api/customer?customerid=${cid}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
  }
}

async function deleteCustomer(customerId: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/customer?customerid=${customerId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log(`Customer ${customerId} deleted successfully`);
    } else {
      console.error(`Failed to delete customer ${customerId}`);
    }
  } catch (error) {
    console.error("Delete error:", error);
  }
}

export async function filterAndDeleteCustomers(uid: string | null | undefined) {
  try {
    const customers: CustomerType[] = await fetchCustomers(uid);

    const customersToDelete = customers.filter(
      ({ product, paid }) => product?.price && paid && +product.price === +paid
    );

    for (const customer of customersToDelete) {
      await deleteCustomer(customer?._id ?? "");
    }
  } catch (error) {
    console.error("Error filtering or deleting customers:", error);
  }
}
