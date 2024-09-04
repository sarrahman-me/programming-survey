import mixpanel from "mixpanel-browser";

if (process.env.NODE_ENV === "production") {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "", {
    track_pageview: true,
    persistence: "localStorage",
  });
} else {
  mixpanel.init("inisihpastisalah", {
    debug: true,
  });
}

export default mixpanel;
