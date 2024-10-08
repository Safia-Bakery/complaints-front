import {Link} from "react-router-dom";
import useCategories from "@/hooks/useCategories.ts";
import {Col, Row} from "antd";
import Loading from "@/components/Loader";
import Button from "@/components/Button";
import {BtnTypes} from "@/utils/types.ts";

const SelectCategory = () => {
    const {data, isLoading} = useCategories({})
    if (isLoading) return <Loading/>;

    return <Row gutter={[16, 16]}>
        {data?.map(item => (
            <Col span={12} key={item.id} className={'w-full'}>
                <Link to={`${item.id}`}>
                    <Button btnType={BtnTypes.tgPrimary} className={'w-full !p-4 h-max'}>{item.name}</Button>
                </Link>
            </Col>
        ))}
    </Row>
}
export default SelectCategory;