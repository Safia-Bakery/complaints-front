import BaseInputs from "@/components/BaseInputs";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import MainInput from "@/components/BaseInputs/MainInput";
import MainSelect from "@/components/BaseInputs/MainSelect";
import MyButton from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loader";
import subCategoryMutation from "@/hooks/mutations/subCategories";
import useCategories from "@/hooks/useCategories";
import useCountries from "@/hooks/useCountries";
import useSubCategories from "@/hooks/useSubCategories";
import errorToast from "@/utils/error-toast.ts";
import successToast from "@/utils/success-toast.ts";
import {BtnTypes} from "@/utils/types";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";

const EditAddSubCategory = () => {
    const {t} = useTranslation();
    const {id, childId} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const {mutate: postCategory, isPending} = subCategoryMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
    } = useForm();

    const {data: categories, isLoading: categoryLoading} = useCategories({});
    const {data: countries, isLoading: countryLoading} = useCountries({
        status: 1,
    });

    const {data, isLoading} = useSubCategories({
        id: Number(childId),
        category_id: id,
        enabled: !!childId,
    });

    const category = data?.items?.[0];

    const onSubmit = () => {
        const {status, category_id, country_id, name} = getValues();
        postCategory(
            {
                category_id,
                status: +status,
                country_id,
                name,
                ...(childId && {id: +childId}),
            },
            {
                onSuccess: () => {
                    successToast(!id ? "created" : "updated");
                    goBack();
                },
                onError: (e) => errorToast(e.message),
            }
        );
    };

    useEffect(() => {
        reset({
            category_id: id,
            country_id: category?.country_id,
            ...(category?.name && {name: category.name}),
            ...(category?.status && {status: category.status}),
        });
    }, [category]);

    if ((isLoading && !!id) || isPending || categoryLoading || countryLoading)
        return <Loading/>;

    return (
        <Container>
            <div className="flex justify-end">
                <MyButton onClick={() => navigate(-1)} btnType={BtnTypes.black}>
                    {t("back")}
                </MyButton>
            </div>
            <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
                <BaseInputs label="category" error={errors.category_id}>
                    <MainSelect
                        values={categories}
                        register={register("category_id", {
                            required: t("required_field"),
                        })}
                    />
                </BaseInputs>
                <BaseInputs label="name" error={errors.name}>
                    <MainInput
                        register={register("name", {
                            required: t("required_field"),
                        })}
                    />
                </BaseInputs>
                <BaseInputs label="country" error={errors.country_id}>
                    <MainSelect
                        values={countries?.items}
                        register={register("country_id", {
                            required: t("required_field"),
                        })}
                    />
                </BaseInputs>

                <BaseInputs label="status">
                    <MainCheckBox label={"active"} register={register("status")}/>
                </BaseInputs>

                <MyButton htmlType="submit" btnType={BtnTypes.black}>
                    {t("save")}
                </MyButton>
            </form>
        </Container>
    );
};

export default EditAddSubCategory;
