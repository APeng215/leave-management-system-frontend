<script>
import FetchHelper from '../js/util/FetchHelper';
export default {
    mounted() {
        this.requestLeaveInfos();
    },
    data() {
        return {
            leaveRequest: {
                type: null,
                startDate: null, // Add a property to store the start date
                endDate: null,   // Add a property to store the end date
                duration: 0,
                reason: null
            },
            leaveRequestTable: {
                fields: [
                    { key: "name", lable: "申请人" },
                    { key: "username", label: "学号/工号" },
                    { key: "type", lable: "请假类型" },
                    { key: "beginDate", label: "开始日期" },
                    { key: "endDate", label: "结束日期" },
                    { key: "reason", label: "请假原因" },
                    { key: "approvalStatus", label: "审批状态" },
                    { key: "createTime", lable: "创建时间" },
                    { key: "updateTime", lable: "更新时间" }
                ],
                items: []
            }
        };
    },
    methods: {

        calculateDuration() {
            // Get the selected start and end dates from the input fields
            var start = new Date(this.leaveRequest.startDate);
            var end = new Date(this.leaveRequest.endDate);

            // Check if endDate is before startDate
            if (end < start) {
                this.leaveRequest.endDate = this.leaveRequest.startDate; // Reset endDate to be the same as startDate
                start = new Date(this.leaveRequest.startDate);
                end = new Date(this.leaveRequest.endDate);
            }

            // Calculate the difference in days
            const timeDiff = end.getTime() - start.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24);

            // Update the duration in the data
            this.leaveRequest.duration = daysDiff + 1;
        },
        async requestLeaveInfos() {
            const result = await FetchHelper.fetch("GET", "http://localhost:8081/backend/requestLeaveInfo", "");
            for (let item of result) {
                this.leaveRequestTable.items.push(item);
            }
        },
        async submitLeaveRequest() {
            // Close modal
            this.$refs.modalCloseButton.click();
            // Send logging information
            const result = await FetchHelper.fetch("POST", "http://localhost:8081/backend/leaveRequest", this.leaveRequest);
        },
    }
}
</script>


<template>
    <div class="d-flex justify-content-center align-items-center flex-column vh-100">
        <div>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#leaveRequest">
                申请请假
            </button>
            <!-- Modal -->
            <div class="modal fade" id="leaveRequest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                ref="leaveRequestModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">请假申请</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="needs-validation" ref="requestForm" id="requestForm"
                                @submit.prevent="submitLeaveRequest">
                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputRequestType">请假类型</label>
                                    <select class="form-select" id="inputRequestType" name="requestType"
                                        v-model="leaveRequest.type" required>
                                        <option option selected disabled>选择请假类型</option>
                                        <option value="病假">病假</option>
                                        <option value="事假">事假</option>
                                    </select>
                                </div>

                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputRequestBeginDate">请假开始日期</label>
                                    <input type="date" class="form-control" id="inputRequestBeginDate"
                                        name="requestBeginDate" v-model="leaveRequest.startDate" @input="calculateDuration"
                                        required>
                                </div>

                                <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputRequestEndDate">请假结束日期</label>
                                    <input type="date" class="form-control" id="inputRequestEndDate" name="requestEndDate"
                                        v-model="leaveRequest.endDate" @input="calculateDuration" required>
                                </div>

                                <div class="input-group mb-3">
                                    <label class="input-group-text">请假时长</label>
                                    <input type="text" class="input-group-text" readonly
                                        :value="this.leaveRequest.duration">
                                    <span class="input-group-text">天</span>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-text">请假原因</span>
                                    <textarea class="form-control" v-model="leaveRequest.reason" required></textarea>
                                    <div class="invalid-feedback">
                                        请输入请假原因
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                ref="modalCloseButton">取消</button>
                            <button type="submit" form="requestForm" class="btn btn-primary">提交申请</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <b-table :fields="leaveRequestTable.fields" :items="leaveRequestTable.items" responsive="sm">
            </b-table>
        </div>
</div></template>