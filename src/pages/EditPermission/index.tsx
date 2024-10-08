import Header from "@/components/Header";
import { useNavigate, useParams } from "react-router-dom";

import { Fragment, useEffect } from "react";
import Loading from "@/components/Loader";
import usePermissions from "@/hooks/usePermissions";
import { useForm } from "react-hook-form";
import errorToast from "@/utils/error-toast.ts";
import successToast from "@/utils/success-toast.ts";
import { useTranslation } from "react-i18next";
import roleMutation from "@/hooks/mutations/roles";
import Container from "@/components/Container";
import useRoles from "@/hooks/useRoles";
import MyButton from "@/components/Button";

const EditPermission = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate } = roleMutation();
  const { data: permissions, isLoading } = usePermissions({});
  const { data: roles, isLoading: roleLoading } = useRoles({ id: Number(id) });

  const { register, handleSubmit, getValues, reset } = useForm();

  const onSubmit = () => {
    const ids = Object.keys(getValues())
      .filter((val) => !!getValues(val))
      .map((item) => +item);

    mutate(
      { permissions: ids, id: Number(id) },
      {
        onSuccess: () => {
          successToast("successfully updated");
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (roles?.items) {
      const init = roles?.items?.[0]?.permission?.reduce((acc: any, item) => {
        acc[item.action_id] = item.action_id;
        return acc;
      }, {});
      reset(init);
    }
  }, [roles?.items]);

  if (isLoading || roleLoading) return <Loading />;

  return (
    <Container className={"pb-11"}>
      <Header title={`${roles?.items?.[0]?.name}`}>
        <MyButton onClick={() => navigate(-1)}>{t("back")}</MyButton>
      </Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="bordered">
          {permissions?.items?.map((item) => {
            return (
              <Fragment key={item.id}>
                <thead>
                  <tr>
                    <th className={"bg-primary text-white text-left p-2"}>
                      {item?.name}
                    </th>
                    <th className={"bg-primary text-white"} />
                  </tr>
                </thead>

                <tbody>
                  {item.action.map((child) => (
                    <tr
                      key={child?.id}
                      className="hover:bg-gray-300 transition-colors border-b border-b-gray-500"
                    >
                      <td>{child?.name}</td>
                      <td width={50}>
                        <input
                          type="checkbox"
                          value={child?.id}
                          {...register(`${child?.id}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Fragment>
            );
          })}
        </table>
        <div className="flex w-full justify-end mt-3">
          <MyButton type="submit">{t("save")}</MyButton>
        </div>
      </form>
    </Container>
  );
};

export default EditPermission;
