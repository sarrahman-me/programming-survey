import { GetDataApi } from "@/utils/fetcher";

export async function GET() {
  try {
    const response = await GetDataApi(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/language`,
    );

    if (response.status !== 200) {
      return Response.json(response.data, { status: response.status });
    }

    return Response.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
