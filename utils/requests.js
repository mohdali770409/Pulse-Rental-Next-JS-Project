const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export const fetchProperties = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`,{cache:'no-store'});
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("error in fetching properties");
  }
};

export const fetchProperty = async (id) => {
  try {
    if (!apiDomain) return null;
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("failed to fetch property");
    }
    return res.json();
  } catch (error) {
    console.log("error in fetching property");
    console.log(error);
    return null;
  }
};
