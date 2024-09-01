export async function GetDataApi(
  url: string,
): Promise<{ status: number; data: any }> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}

export async function PostDataApi(
  url: string,
  payload: any,
): Promise<{ status: number; data: any }> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}

export async function PatchDataApi(
  url: string,
  payload: any,
): Promise<{ status: number; data: any }> {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}

export async function DeleteDataApi(
  url: string,
  payload?: any,
): Promise<{ status: number; data: any }> {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}
