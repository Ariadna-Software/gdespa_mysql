var expect = require('chai').expect,
    dbCon = require('../lib/db_connection'),
    auth = require('../lib/authorize');

describe("Authorization", function () {
    var apk = "";
    before(function (done) {
        // create the user group used for the test
        dbCon.execSql('prepare_authorize_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
    describe("Login", function () {
        it("should returns a user and an api key", function(done){
            auth.login('login', 'password', function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.property("user");
                expect(res).to.have.property("api_key");
                expect(res.user).not.to.be.null;
                expect(res.api_key).not.to.be.null;
                apk = res.api_key;
                console.log("RES1: ", res);
                done();
            }, true);
        });
        it("should control incorrect login",function(done){
            auth.login('***', '***', function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.property("user");
                expect(res).to.have.property("api_key");
                expect(res.user).to.be.null;
                expect(res.api_key).to.be.null;
                done();
            }, true);
        });
    });
    describe("Check API_KEY", function () {
        it("should check a correct api key", function(done){
            console.log("APK: ", apk);
            auth.checkApiKey(apk,function(err, res){
                expect(err).to.be.null;
                expect(res).to.be.true;
                done();
            }, true);
        });
        it("should not check an incorrect api key", function(done){
            auth.checkApiKey("***",function(err, res){
                expect(err).to.be.null;
                expect(res).to.be.false;
                done();
            }, true);
        });
    });
    // after all delete test records
    after(function (done) {
        dbCon.execSql('delete_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
})