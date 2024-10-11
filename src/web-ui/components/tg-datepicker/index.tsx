import {DatePicker, ConfigProvider} from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";

// @ts-ignore
import {SharedPickerProps} from "rc-picker/lib/interface";
import {dateTimeFormat} from "@/utils/helper.ts";

dayjs.locale("ru");

const TgDatepicker = (props: SharedPickerProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {padding: 5, margin: 5, lineWidth: 1},
                components: {
                    DatePicker: {
                        cellWidth: 25,
                        padding: 10,
                        paddingBlock: 2,
                        timeColumnWidth: 40,
                        timeColumnHeight: 100,
                        cellHeight: 20,
                        zIndexPopup: 9,
                        withoutTimeCellHeight: 50,
                        colorPrimary: "#DCC38B",
                    },
                    Button: {
                        colorPrimary: "#DCC38B",
                    },
                },
            }}
            locale={ruRU}
        >
            <DatePicker  {...props} />
        </ConfigProvider>
    );
};

export default TgDatepicker;
