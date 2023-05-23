
import * as React from 'react';
import {
    IComboBoxOption, MaskedTextField,
    IDropdown, Callout,
    Icon, DirectionalHint
} from '@fluentui/react';
import './yearPickerCSS.scss'
import * as dtfns from "date-fns"
import CustomYearPicker from './CustomYearPicker';

export interface ChoicesPickerComponentProps {
    label: string;
    value: string | null;
    onChange: (newValue: string | undefined) => void;
}

export const yearPicker = React.memo((props: ChoicesPickerComponentProps) => {
    const { label, value, onChange } = props;
    const [showCalendar, setShowcalendar] = React.useState(false);
    const buttonContainerRef = React.useRef<HTMLDivElement>(null);
    const [selectedYear, setSelectedYear] = React.useState<string | number | undefined>(new Date(value ? value.toString() + "-01-01" : "").getFullYear()); //selected year

    React.useEffect(() => {
        setSelectedYear(value?.toString())
    }, [])

    const changeYear = (year: any) => {
        let yearDate = year ? year.toString() + "-01-01" : undefined;
        onChange(yearDate);
        setShowcalendar(false)
        setSelectedYear(year);
    }

    return (
        <div className="yearPicker-Container">
            <div className="yearPicker-ContainerA">
                <MaskedTextField
                    placeholder='Select Year'
                    mask="9999"
                    title="Enter Year"
                    maskChar={""}
                    value={selectedYear ? selectedYear.toString() : ""}
                    underlined
                    ref={buttonContainerRef}
                />
                <div className="dropdown-button" onClick={() => { setShowcalendar(true) }}>
                    <Icon iconName="Calendar" />
                </div>
                {showCalendar && (
                    <Callout
                        isBeakVisible={false}
                        gapSpace={0}
                        doNotLayer={false}
                        target={buttonContainerRef}
                        directionalHint={DirectionalHint.bottomLeftEdge}
                        onDismiss={() => setShowcalendar(false)}
                    >
                        <div className='year-list'>
                            <CustomYearPicker value={value} label={label} onChange={changeYear} />
                        </div>
                    </Callout>
                )}
            </div>
        </div>
    )

})

