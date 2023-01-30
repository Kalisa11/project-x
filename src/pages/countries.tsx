import { supabase } from "@lib/supabase";

type Countries = {
  continent: string;
  id: number;
  iso2: string;
  iso3: string;
  local_name: string;
  name: string;
}[];

function Page({ countries }: { countries: Countries }) {
  console.log(countries);
  return (
    <ul>
      {countries?.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("countries").select();

  return {
    props: {
      countries: data,
    },
  };
}

export default Page;
