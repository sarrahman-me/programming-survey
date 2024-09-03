import { GetDataApi } from "@/utils/fetcher";

export async function GET(_: Request, { params }: { params: { id: number } }) {
  try {
    const response = await GetDataApi(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/language/${params.id}`,
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
