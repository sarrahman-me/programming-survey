import { PostDataApi } from "@/utils/fetcher";

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const res = await PostDataApi(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/comparisons`,
      payload,
    );

    if (res.status !== 201) {
      return Response.json(res.data, { status: res.status });
    }

    return Response.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
