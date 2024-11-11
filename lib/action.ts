"use server";

const baseUrl = "https://tensi-data-management-web-software.vercel.app";
// "https://tensi-data-management-web-software.vercel.app";

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
          next: { revalidate: 0 },
        }
      );
      const data = await response.json();
      return data.response;
    }
  } catch (error) {
    console.error(error);
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
