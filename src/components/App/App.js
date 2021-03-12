import React, {useState, useRef, Fragment} from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ScrollTop from 'im';

import Status from '../Status/Status';
import UploadFile from '../UploadFile/UploadFile';
import Checkboxes from '../Checkboxes/Checkboxes';
import DownloadButton from '../DownloadButton/DownloadButton';
import ReceivingDataContainer from '../ReceivingDataContainer/ReceivingDataContainer';

import {ERROR_MESSAGE} from '../../constants/statusMessages';

import {saveAs} from '@progress/kendo-file-saver';
const Excel = require('exceljs');

import './App.css';

const App = () => {
    const bottomRef = useRef();
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [receivedProcessedData, setReceivedProcessedData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [checkboxState, setCheckboxState] = useState({
        keyChecked: true,
        issueTypeChecked: true,
        summaryChecked: true,
        assigneeChecked: true,
        storyPointsChecked: true,
        statusChecked: true,
        unblockChecked: false,
        labelsChecked: false,
        componentsChecked: false,
        fixVersionsChecked: false,
        subtasksCountChecked: false,
        priorityChecked: false,
        reporterChecked: false,
        updatedDateChecked: false,
        agreeChecked: false
    });

    const getWorksheetColumns = (worksheet) => {
        worksheet.columns = [
            {header: 'Key', key: 'key'},
            {header: 'Type', key: 'type'},
            {header: 'Summary', key: 'summary'},
            {header: 'Assignee', key: 'assignee'},
            {header: 'Story Points', key: 'story_points'},
            {header: 'Status', key: 'status'},
            {header: 'Labels', key: 'labels'},
            {header: 'Components', key: 'components'},
            {header: 'Fix Versions', key: 'fix_versions'},
            {header: 'Subtasks count', key: 'subtasks_count'},
            {header: 'Priority', key: 'priority'},
            {header: 'Reporter', key: 'reporter'},
            {header: 'Updated', key: 'updated'}
        ];

        return worksheet;
    };

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const addRows = (finalData, worksheet) => {
        finalData.forEach((issue) => {
            worksheet.addRow({
                key: issue.key,
                type: issue.issueType,
                summary: issue.summary,
                assignee: issue.assignee,
                story_points: issue.storyPoints,
                status: issue.status,
                labels: issue.labels,
                components: issue.components,
                fix_versions: issue.fixVersions,
                subtasks_count: issue.subtasksCount,
                priority: issue.priority,
                reporter: issue.reporter,
                updated: issue.updated
            });
        });
    };

    const downloadFileOnClick = () => {
        const finalData = receivedProcessedData.map((issue) => {
            return {
                key: checkboxState.keyChecked ? issue.key : '',
                issueType: checkboxState.issueTypeChecked
                    ? issue.issueType
                    : '',
                summary: checkboxState.summaryChecked ? issue.summary : '',
                assignee: checkboxState.assigneeChecked ? issue.assignee : '',
                storyPoints: checkboxState.storyPointsChecked
                    ? issue.storyPoints
                    : '',
                status: checkboxState.statusChecked ? issue.status : '',
                labels: checkboxState.labelsChecked ? issue.labels : '',
                components: checkboxState.componentsChecked
                    ? issue.components
                    : '',
                fixVersions: checkboxState.fixVersionsChecked
                    ? issue.fixVersions
                    : '',
                subtasksCount: checkboxState.subtasksCountChecked
                    ? issue.subtasksCount
                    : '',
                priority: checkboxState.priorityChecked ? issue.priority : '',
                reporter: checkboxState.reporterChecked ? issue.reporter : '',
                updated: checkboxState.updatedDateChecked ? issue.updated : ''
            };
        });
        // eslint-disable-next-line no-console
        console.log(finalData);

        let workbook = new Excel.Workbook();
        if (selectedFile) {
            workbook.xlsx.load(selectedFile).then(() => {
                let worksheet = workbook.getWorksheet(1);
                getWorksheetColumns(worksheet);
                addRows(finalData, worksheet);

                workbook.xlsx.writeBuffer().then((data) => {
                    let blob = new Blob([data], {
                        type:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    saveAs(blob, 'data_sheet.xlsx');
                });
            });
        } else {
            let worksheet = workbook.addWorksheet('Jira');
            getWorksheetColumns(worksheet);

            worksheet.columns.forEach((column) => {
                column.width =
                    column.header.length < 12 ? 12 : column.header.length;
            });
            worksheet.getRow(1).font = {bold: true};

            addRows(finalData, worksheet);

            workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], {
                    type:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });
                saveAs(blob, 'data_sheet.xlsx');
            });
        }
    };

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom align="center">
                Welcome to the JIRA project!
            </Typography>
            <Divider variant="middle" />
            <ReceivingDataContainer
                bottomRef={bottomRef}
                setStatus={setStatus}
                setIsLoading={setIsLoading}
                setReceivedProcessedData={setReceivedProcessedData}
            />
            <Status isLoading={isLoading} status={status} />
            {status && status !== ERROR_MESSAGE && (
                <Fragment>
                    <Typography
                        variant="h5"
                        gutterBottom
                        align="center"
                        className="after-receiving-data-information"
                    >
                        You can choose the existing file, that contains Jira
                        data and download merged results by clicking the last
                        button on this page
                    </Typography>
                    <UploadFile
                        selectedFile={selectedFile}
                        onFileChange={onFileChange}
                    />
                    <Checkboxes
                        checkboxState={checkboxState}
                        setCheckboxState={setCheckboxState}
                    />
                    <DownloadButton
                        downloadFileOnClick={downloadFileOnClick}
                        checkboxState={checkboxState}
                        status={status}
                    />
                </Fragment>
            )}
            <div ref={bottomRef} />
            <ScrollTop id="scroll-to-top" />
        </Fragment>
    );
};

export default App;
