import { IconButton } from '@fluentui/react';
import * as React from 'react';

export interface ChoicesPickerComponentProps {
    label: string;
    value: string | null;
    onChange: (newValue: string | undefined) => void;
}

const CustomYearPicker: React.FC<ChoicesPickerComponentProps> = (props) => {
    const { label, value, onChange } = props;
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const endYear = currentYear + 20;

    const selectedYearFromValue = value ? new Date(value).getFullYear() : currentYear;
    const [selectedYear, setSelectedYear] = React.useState(selectedYearFromValue);
    const [startYear, setStartYear] = React.useState(
        selectedYear > endYear - 12 ? endYear - 12 : selectedYear
    );

    React.useEffect(() => {
        setStartYear(selectedYear > endYear - 12 ? endYear - 12 : selectedYear);
    }, [selectedYear]);

    const handleYearChange = (year: any) => {
        setSelectedYear(year);
        onChange(year.toString());
    };

    const handlePrevClick = () => {
        if (startYear - 12 >= minYear) {
            setStartYear(startYear - 12);
        } else {
            const remainingYears = startYear - minYear;
            setStartYear(startYear - remainingYears);
        }
    };

    const handleNextClick = () => {
        if (startYear + 12 <= endYear) {
            setStartYear(startYear + 12);
        } else {
            const remainingYears = endYear - startYear + 1;
            setStartYear(startYear + remainingYears - 12);
        }
    };

    const renderYearOptions = () => {
        const yearOptions = [];

        for (let year = startYear; year < startYear + 12; year++) {
            yearOptions.push(
                <div
                    key={year}
                    className={`year-option ${year === selectedYear ? 'selected' : ''}`}
                    onClick={() => handleYearChange(year)}
                >
                    {year}
                </div>
            );
        }

        return yearOptions;
    };

    return (
        <div className="year-picker">
            <div className="year-picker-header">
                <IconButton iconProps={{ iconName: "ChevronLeft" }} onClick={handlePrevClick} disabled={startYear <= minYear}>
                    Prev
                </IconButton>
                <h3>Year Picker</h3>
                <IconButton iconProps={{ iconName: "ChevronRight" }} onClick={handleNextClick} disabled={startYear + 12 > endYear}>
                    Next
                </IconButton>
            </div>
            <div className="year-picker-options">{renderYearOptions()}</div>
        </div>
    );
};

export default CustomYearPicker;