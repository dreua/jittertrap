/* global JT */

$(document).ready(function() {

  $("#jt-version-maintainer").html(JT.version.maintainerVersion);
  $("#jt-version-repo").html(JT.version.repo);
  $("#jt-version-branch").html(JT.version.branch);
  $("#jt-version-commit").html(JT.version.commit);
  $("#jt-version-commit-time").html(new Date(JT.version.commitTime * 1000));
  $("#jt-version-clean").html(JT.version.isClean);

  // This is the Evil tracking code that phones home to tell the Evil vendor
  //  that someone is using the software!
  var versionInfo = JSON.stringify(JT.version);
  $.ajax(
    {
      url: "https://www.jittertrap.net/tracker",
      data: "srcrepo="+versionInfo,
      method: "POST",
      success: function(result) {;}
    }
  );

  // Initialize Chart Options
  $("#jt-measure-datalength").html(JT.core.sampleCount());
  $("#chopts_chartPeriod").val(JT.charts.getChartPeriod());

  // Initialize WebSockets
  var wsUri = "ws://" + document.domain + ":" + location.port;
  JT.ws.init(wsUri);

  // UI Event Handlers
  $("#chopts_series").on('change', JT.charts.resetChart);
  $('#set_netem_button').on('click', JT.ws.set_netem);
  $('#clear_netem_button').on('click', JT.ws.clear_netem);
  $('#dev_select').on('change', JT.ws.dev_select);
  $('#chopts_stop_start').on('click', JT.charts.toggleStopStartGraph);

  $("#chopts_chartPeriod").on('change', function() {
    var plotPeriod = $("#chopts_chartPeriod").val();
    var result = JT.charts.setChartPeriod(plotPeriod);
    $("#chopts_chartPeriod").val(result.newPeriod);
    $("#jt-measure-datalength").html(result.sampleCount);
  });

  $("[href=#showTputPanel]")
    .on('shown.bs.tab', JT.charts.resetChart);
  $("[href=#showTopTalkPanel]")
    .on('shown.bs.tab', JT.charts.resetChart);

  $('#more_chopts_toggle').click(function() {
    $('#more_chopts').toggle("fast");
    return false;
  });

  $('#trigger_toggle').click(function() {
    $('#trigger_chopts').toggle("fast");
    return false;
  });

  // Disable form submit
  $('#chartsForm').on('submit', function(e){ e.preventDefault(); });
  $('#devSelectForm').on('submit', function(e){ e.preventDefault(); });
  $('#impairmentsForm').on('submit', false);


  // Changing traps from the list of traps in the trap modal
  $('#trap_names').on('change', JT.trapModule.trapSelectionHandler);
  // Add a trap
  $('#add_trap_modal button').last().on('click', JT.trapModule.addTrapHandler);

  $("#new_program").val(JT.programsModule.templateProgram);
  $('#add_program_modal button').last().on('click', JT.programsModule.addProgramHandler);
});

