import {
    SET_DATA,
    SET_FILTER,
    FILTER,
    SET_ASSESSMENTS_AFTER_DELETE,
} from "./constants";

const reducer = (state, action) => {
    if (action.type === SET_DATA) {
        const { assessments, options } = action.payload;

        const pagesCount = Math.ceil(
            assessments.length / state.filterOptions.showCount
        );

        const newQuery = assessments.slice(0, state.filterOptions.showCount);

        return {
            ...state,
            assessments,
            options,
            pagesCount,
            filteredAssessments: newQuery,
        };
    }

    if (action.type === SET_FILTER) {
        const { name, value } = action.payload;

        return {
            ...state,
            filterOptions: { ...state.filterOptions, [name]: parseInt(value) },
        };
    }

    if (action.type === SET_ASSESSMENTS_AFTER_DELETE) {
        const assessments = action.payload;
        const { page, showCount } = state.filterOptions;

        let newAssessments = [...assessments];

        const { newQuery, pagesCount } = filter({
            ...state.filterOptions,
            newAssessments,
        });
        console.log(newQuery);
        return {
            ...state,
            assessments,
            filteredAssessments: newQuery,
            page: page > pagesCount ? pagesCount - 1 : page,
            showCount,
            pagesCount,
        };
    }

    if (action.type === FILTER) {
        let newAssessments = [...state.assessments];
        const { page, showCount } = state.filterOptions;

        const { newQuery, pagesCount } = filter({
            ...state.filterOptions,
            newAssessments,
        });

        return {
            ...state,
            filteredAssessments: newQuery,
            page: page > pagesCount ? pagesCount - 1 : page,
            showCount,
            pagesCount,
        };
    }

    return state;
};

export default reducer;

const filter = ({
    weightId,
    distanceId,
    frequencyId,
    needToAssess,
    page,
    showCount,
    newAssessments,
}) => {
    //#region filters

    if (weightId > 0) {
        newAssessments = newAssessments.filter((x) => x.weightId == weightId);
    }

    if (distanceId > 0) {
        newAssessments = newAssessments.filter(
            (x) => x.distanceId == distanceId
        );
    }

    if (frequencyId > 0) {
        newAssessments = newAssessments.filter(
            (x) => x.frequencyId == frequencyId
        );
    }

    if (needToAssess == 1) {
        newAssessments = newAssessments.filter((x) => x.needToAssess);
    } else if (needToAssess == 2) {
        newAssessments = newAssessments.filter((x) => !x.needToAssess);
    }

    //#endregion filters

    const pagesCount = Math.ceil(newAssessments.length / showCount);

    const beginning = page * showCount - showCount;

    const end = beginning + showCount;

    const newQuery = newAssessments.slice(beginning, end);

    return { newQuery, pagesCount };
};
