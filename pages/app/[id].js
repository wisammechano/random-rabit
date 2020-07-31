import { useRouter } from "next/router";
import { getLocalStorage } from "../../utils/storage";
import Error from "next/error";
import { useEffect, useState } from "react";

const getGroup = (id) => {
  const data = getLocalStorage();
  console.log(data);
  if (data) {
    return data.groups.filter((g) => g.id === id).shift();
  }
  return null;
};

const Random = () => {
  const route = useRouter();
  const groupId = parseInt(route.query.id);
  const [group, setGroup] = useState(true);

  useEffect(() => {
    console.log(groupId, route.query);
    setGroup(getGroup(groupId));
  }, [groupId]);

  return <>{(group && <div>Random</div>) || <Error statusCode="404" />}</>;
};

export default Random;
