import { TestBed, inject } from '@angular/core/testing';

import { FlowAutomationExecutionViewComponent } from './flow-automation-execution-view.component';

describe('a flow-automation-execution-view component', () => {
	let component: FlowAutomationExecutionViewComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FlowAutomationExecutionViewComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FlowAutomationExecutionViewComponent], (FlowAutomationExecutionViewComponent) => {
		component = FlowAutomationExecutionViewComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});