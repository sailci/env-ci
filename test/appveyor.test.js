import test from 'ava';
import appveyor from '../lib/appveyor';

const env = {
	APPVEYOR: 'true',
	APPVEYOR_JOB_NUMBER: '1234',
	APPVEYOR_JOB_ID: 'job_id',
	APPVEYOR_BUILD_VERSION: '100',
	APPVEYOR_REPO_COMMIT: '5678',
	APPVEYOR_BUILD_NUMBER: '91011',
	APPVEYOR_REPO_BRANCH: 'master',
	APPVEYOR_REPO_NAME: 'owner/repo',
	APPVEYOR_PROJECT_SLUG: 'owner/repo',
	APPVEYOR_BUILD_FOLDER: '/',
};

test('Push', t => {
	t.deepEqual(appveyor.configuration({env}), {
		name: 'Appveyor',
		service: 'appveyor',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://ci.appveyor.com/project/owner/repo/build/100',
		branch: 'master',
		root: '/',
		job: '1234',
		jobUrl: 'https://ci.appveyor.com/project/owner/repo/build/job/job_id',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	t.deepEqual(appveyor.configuration({env: Object.assign({}, env, {APPVEYOR_PULL_REQUEST_NUMBER: '10'})}), {
		name: 'Appveyor',
		service: 'appveyor',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://ci.appveyor.com/project/owner/repo/build/100',
		branch: 'master',
		root: '/',
		job: '1234',
		jobUrl: 'https://ci.appveyor.com/project/owner/repo/build/job/job_id',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
